import * as theme from '../dist/index.js'
import fs from 'fs'

/**
 * theme.css
 * :root {
 *  --gray-900: #171923
 * }
 */

const toCssCasting = (str) => {
    return str
        .replace(/([a-z])(\d)/, "$1-$2")
        .replace(/([A-Z])/g, "-$1")
        .toLowerCase();
}

const generateThemeCssVariables = () => {
    const cssString = []

    Object.entries(theme.vars).forEach(([key, value]) => {
        if (key === 'colors') {
            Object.entries(value.$static).forEach(([colorKey, colorValue]) => {
                const selector = colorKey === 'light' ? ":root" : ':root .theme-dark'

                const cssVariables = Object.entries(colorValue).map(([mainKey, mainValue]) => (
                    Object.entries(mainValue).map(([subKey, subValue]) => `--${toCssCasting(mainKey)}-${toCssCasting(subKey)}: ${subValue};`)
                ).join('\n')).join('\n')


                cssString.push(`${selector} {\n${cssVariables}\n}`)
            })
        }

    })

    return cssString
}

const generateThemeCss = () => {
    const variables = generateThemeCssVariables();

    fs.writeFileSync('dist/theme.css', variables.join('\n'))
}

generateThemeCss()


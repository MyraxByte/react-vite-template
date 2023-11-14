import { createTheme, DEFAULT_THEME } from '@mantine/core';

export const theme = createTheme({
    fontFamily: 'Ubuntu',
    headings: {
        fontFamily: 'Ubuntu',
    },
    primaryColor: 'accent',
    primaryShade: 4,
    colors: {
        ...DEFAULT_THEME.colors,
        dark: ['#C1C2C5', '#A6A7AB', '#909296', '#5c5f66', '#373A40', '#2C2E33', '#24272b', '#1F2125', '#141517', '#101113'],
        accent: ['#f1ebff', '#ddd2ff', '#b8a2fa', '#916ff5', '#6f43f1', '#5a28ef', '#4f19ef', '#400ed5', '#380ac0', '#2e05a8'],
        error: ['#ffeaef', '#fed4dd', '#f5a6b8', '#ed7690', '#e74e6f', '#e43459', '#e3254f', '#ca1740', '#b40f38', '#a0002f'],
        success: ['#edfdf3', '#daf8e5', '#aff1c7', '#82eba7', '#5fe58c', '#4ae27b', '#3ee172', '#31c760', '#27b054', '#159945'],
        text: ['#eaf8f8', '#e4e7eb', '#cccccf', '#afb0b3', '#98999b', '#898a8d', '#808287', '#6e7075', '#60636a', '#525561'],
    },
});

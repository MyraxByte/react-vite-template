import appConfig from '@/app.json';

const blackBackground = ['font-size: 14px', 'background-color: black', 'color: white'].join(' ;');
const whiteBackground = ['font-size: 14x;', 'background-color: white', 'color: black', 'font-weight: 700'].join(' ;');

export default function showVersion() {
    const version = appConfig.version;
    const commitHash = appConfig.checksum.substring(0, 7);
    const mode = import.meta.env.MODE;

    console.log(`%c version %c v${version} (${commitHash})`, blackBackground, whiteBackground);
    console.log(`%c mode %c ${mode} `, blackBackground, whiteBackground);
}

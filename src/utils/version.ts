import packageJson from "../../package.json";

const blackBackground = ["font-size: 14px", "background-color: black", "color: white"].join(" ;");
const whiteBackground = ["font-size: 14x;", "background-color: white", "color: black", "font-weight: 700"].join(" ;");

export default function showVersion() {
	console.log(`%c version %c v${packageJson.version} `, blackBackground, whiteBackground);
	console.log(`%c mode %c ${import.meta.env.MODE} `, blackBackground, whiteBackground);
}

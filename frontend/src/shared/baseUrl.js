import isProd from "./ProdDetect";

let baseUrl = '';
if (isProd()) {
    baseUrl = 'https://www.overflowedminds.net';
} else {
    baseUrl = 'http://localhost:8000';
}

export default baseUrl;

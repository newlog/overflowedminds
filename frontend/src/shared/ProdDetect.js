
export default function isProd()
{
    console.log(!process.env.REACT_APP_PROD || process.env.REACT_APP_PROD === 'true');
    return !process.env.REACT_APP_PROD || process.env.REACT_APP_PROD === 'true';
}

// https://stackoverflow.com/questions/35469836/detecting-production-vs-development-react-at-runtime
// https://create-react-app.dev/docs/adding-custom-environment-variables/
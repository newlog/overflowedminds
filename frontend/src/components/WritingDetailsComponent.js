import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Header from './HeaderComponent';
import Menu from './LeftMenuComponent';
import '../App.css'
import Footer from './FooterComponent';
import baseUrl from '../shared/baseUrl';
import { CodeBlock, H1Custom, H2Custom, H3Custom, ACustom, ImgCustom } from './MarkdownComponents';
import ReactMarkdown from 'react-markdown';
const gfm = require('remark-gfm')
const toc = require("@jsdevtools/rehype-toc");
const slug = require('remark-slug');

const WritingHeader = (props) => {

    const { title } = props;

    return (
        <div className='writingTitle'>{title}</div>
    )

}

const WritingBody = (props) => {
    const { body } = props;

    return (
        <ReactMarkdown
            children={body}
            // After trying all possible combinations, for whatever rason, 
            // toc plugin did not work as remark, and slug plugin did not work as rehype.
            rehypePlugins={[toc, gfm]}
            remarkPlugins={[slug]}
            components={{
                h1: ({node, ...props}) => <H1Custom {...props} />,
                h2: ({node, ...props}) => <H2Custom {...props} />,
                h3: ({node, ...props}) => <H3Custom {...props} />,
                a: ({node, ...props}) => <ACustom {...props} />,
                img: ({node, ...props}) => <ImgCustom {...props} />,
                code: ({node, ...props}) => <CodeBlock {...props} />,
            }}
        />
    )

}

const WritingDetails = () => {

    let { writingSlug } = useParams();

    console.log(writingSlug);
    
    const [error, setErrors] =  useState(false)
    const [writingDetail, setWritingDetail ]= useState([])
    const [isLoading, setIsLoading] = useState(false);

    // here, first of all I need to query the backend for the actual writing detail (using the slug from the URL ideally)
    // then I will get the body of the writing and I can print it

    async function fetchWritingDetail() {
        const res = await fetch(`${baseUrl}/api/writings/${writingSlug}/`);
        res
          .json()
          .then(res => setWritingDetail(res))
          .catch(err => setErrors(err));
    }


    useEffect(() => {
        setIsLoading(true);
        fetchWritingDetail()
        setIsLoading(false);
    }, []);


    //const classes = useRowStyles();
    console.log(writingDetail);
    
    return (
        <>
            <Header/>
            <div className="writingDetails">
                <Box ml={15} width={700}>
                    {isLoading && <div>Loading ...</div>}
                    {error && <div>Something went wrong ...</div>}
                    {writingDetail !== null &&
                        <div>
                            <Menu />
                            <WritingHeader title={writingDetail.title} />
                            <WritingBody body={writingDetail.body} />
                            <Footer />
                        </div>    
                    }
                </Box>
            </div>
        </>
    );
}

export default WritingDetails;
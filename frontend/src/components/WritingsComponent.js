import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import ReactMarkdown from 'react-markdown';
import '../App.css';
import Header from './HeaderComponent';
import baseUrl from '../shared/baseUrl';


const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
      maxWidth: '60vw',
      maxHeight: '80vh',
      marginTop: '-15vh',
    },
    displayLinebreak: {
        whiteSpace: 'pre-line',
    },
    tableHead: {
        backgroundColor: 'rgb(40, 39, 41)'
    },
    tableBody: {
        "&> :hover": {
            backgroundColor: "#333",
            textDecorationColor: '#679'
          }

    }
  });

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [likeClicked, setLikeClicked] = React.useState(false);
    const [likes, setLikes] = React.useState(row.likes_count);

    const classes = useRowStyles();

    const slug = row.writing_path.substring(row.writing_path.lastIndexOf('/') + 1)
    const url = row.internal ? `writings/${slug}` : row.url
  
    function LikeWriting(e) {
        const backend_slug = row.slug.substring(0, 59);  // in the backend the slug is cut to 59 characters
        setLikeClicked(!likeClicked);
        fetch(`${baseUrl}/api/writings/${backend_slug}/like/`, {
            method: 'POST',
            body: ''
        })
        .then(res => res.json())
        .then(res => setLikes(res.likes_count))
        .catch(err => console.log(err));
        
        //animateLike()
    }

    return (
      <>
        <TableRow className={classes.root}>
            <TableCell align="center">
                <Button className="likeButton" onClick={(e) => LikeWriting(e)}>
                    {/* An App.css style sets the content of the span to favorite_border */}
                    {/* onClick sets the likeClicked state to true, then the likeClicked class is added to the span */}
                    {/* An App.css style sets the content of the span to "favorite" for likeClicked class */}
                    <span className={`material-icons-outlined like ${likeClicked ? "likeClicked" : "" }`}></span>
                </Button>
                <Box>
                    {likes}
                </Box>
            </TableCell>
            <TableCell align="left">
                <Link href={url || "#"} underline="none" color="inherit"><b>{row.title}</b></Link>
            </TableCell>
            <TableCell align="right">
                {
                    new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'numeric', day: '2-digit'})
                    .format(new Date(Date.parse(row.publication_date)))
                }
            </TableCell>
            <TableCell align="right">
                {row.tags.map((tag) => (
                    <Chip key={tag.id} label={tag.name} variant="outlined" size="small" />
                ))}
            </TableCell>
            <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
        </TableRow>
        <TableRow >
          <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: 'none'}} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box>
                <TableCell align="left" style={{ border: 'none' }} />
                <TableCell align="left" style={{ border: 'none' }}>
                    <ReactMarkdown>{ row.description || "No Description." }</ReactMarkdown>
                </TableCell>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

const Writings = () => {
    const [error, setErrors] =  useState(false)
    const [writings, setWritings ]= useState([])
    const [isLoading, setIsLoading] = useState(false);

    async function fetchWritings() {
        const res = await fetch(`${baseUrl}/api/writings/`);
        res
          .json()
          .then(res => setWritings(res))
          .catch(err => setErrors(err));
    }


    useEffect(() => {
        setIsLoading(true);
        fetchWritings()
        setIsLoading(false);
    }, []);

    /*
    console.log(writings);
    console.log(isLoading);
    console.log(error);
     */

    const classes = useRowStyles();
    return (
        <>
            <Header/>
            <div className="writings">
                <Box ml={8}>
                    {isLoading && <div>Loading ...</div>}
                    {error && <div>Something went wrong ...</div>}
                    {writings.length !== 0 &&
                        <TableContainer className={classes.root}>
                            <Table aria-label="collapsible table">
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left">TITLE</TableCell>
                                        <TableCell align="left">PUBLISHED</TableCell>
                                        <TableCell align="right">TAGS</TableCell>
                                        <TableCell align="right">+INFO</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className={classes.tableBody}>
                                    {writings.map((row) => (
                                        <Row key={row.id} row={row} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </Box>
            </div>
        </>
    );
}

export default Writings;

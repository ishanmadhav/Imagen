import './App.css';
import {Button, Container, TextField, Grid, Input} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import { Publish } from '@material-ui/icons';
import {useState, useEffect} from 'react'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const str='http://localhost:5000/static/'+'52fbb3f048413afc5741b17ec6a2d628'+'.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 850,
  },
}));


function App() {
  const [imgData, setImgData]=useState(null);
  const [imgName, setImgName]=useState(null);
  const [imgList, setImgList]=useState([]);
  const classes = useStyles();

  useEffect(()=>
  {
    fetch('/photoslist')
    .then(res=>res.json())
    .then(data=>{console.log(data)
      setImgList(data)
      })
  })

  const fileChanger=(e)=>
  {
    setImgData(e.target.files[0]);
    setImgName(e.target.name);
  }
  const onUpload=(e)=>
  {
      e.preventDefault();
      const data=new FormData();
      data.append('photo', imgData, imgName);
      fetch('/profile', 
      {
        method: 'POST',
        body: data,
        //headers: {'Content-Type': 'multipart/form-data'}
      })
      .then((res)=>console.log(res))
      

  }
  return (
    <Container fixed>
      < Grid container justify="flex-end" maxwidth='sm'>
      <form onSubmit={onUpload} encType="multipart/form-data">
          <Input type="file" name="photo" onChange={fileChanger}/>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
      </Grid>
    

    <GridList cellHeight={300} className={classes.gridList} cols={3}>
      {imgList.map((img) => (
      <GridListTile key={img.title} cols={img.cols || 1}>
      <img src={img.url} alt={img.title} />
      </GridListTile>
      ))}
    </GridList>
    </Container>
   
  );
}

export default App;


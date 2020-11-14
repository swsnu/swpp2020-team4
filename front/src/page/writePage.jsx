import React, {useEffect, useState} from 'react';
// import { ConnectedRouter } from 'connected-react-router';
// import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Controlled as CodeMirror} from 'react-codemirror2';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MenuBar from '../Component/menuBar';
import * as actionCreators from "../store/actions/user";
import {useDispatch} from 'react-redux';
import {submitSnippet} from "../store/actions/snippet";

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/python/python.js');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: 60,
    margin: 'auto',
    paddingTop: 10,
    paddingLeft: 10,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const WritePage = () => {
  const classes = useStyles();
  const [TabValue, setTabValue] = useState(1);
  const dispatch = useDispatch();

  const [editorValue, setEditorValue] = useState({
    1: '1111',
    2: '2222',
    3: '33333',
    4: '44',
  });

  /* istanbul ignore next */
  const handleEditorValueChange = (i, d) => {
    setEditorValue({...editorValue, [i]: d});
    // handleEditorValidationChange(i, false);
  };

  // const [snippetValidated, setSnippetValidated] = useState({
  //   1: false,
  //   2: false,
  //   3: false,
  //   4: false,
  // });

  // const handleEditorValidationChange = (i, v) => {
  //   setSnippetValidated({...snippetValidated, [i]: v});
  // };

  const [snippetSubmitted, setSnippetSubmitted] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const handleSnippetSubmittionChange = (i, v) => {
    setSnippetSubmitted({...snippetSubmitted, [i]: v});
  };

  const [snippetName, setSnippetName] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
  });

  const [snippetDescr, setSnippetDescr] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
  });

  const [algorithmName, setAlgorithmName] = useState('');
  const [importModalOpen, setImportModalOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // const [errorMsg, setErrorMsg] = useState({
  //   1: '',
  //   2: '',
  //   3: '',
  //   4: '',
  // });
  //
  // const handleErrorMsgChange = (i, v) => {
  //   setErrorMsg({ ...errorMsg, [i]: v });
  // };

  useEffect(() => {
    // TODO: editor라는 store의 loadedDraftName 항목을 통해 draft의 이름을 불러온다
    handleDraft(undefined);
  }, []);

  /* istanbul ignore next */
  const handleDraft = (n) => {
    if (n !== undefined) {
      const draft = JSON.parse(localStorage.getItem(n));
      setEditorValue(draft.code);
      setSnippetName(draft.name);
    }
  };

  /* istanbul ignore next */
  const handleImport = () => {
    setImportModalOpen(true);
    // TODO: change content of modal
    // make editor readonly by changing snippetValidated & snippetSubmitted
  };

  // const handleValidate = (i) => {
  //   if (Math.random() > 0.5) {
  //     window.alert('validated');
  //     handleEditorValidationChange(i, true);
  //   } else {
  //     window.alert('validation fail: change name');
  //   }
  // };

  const handleSubmitSnippet = (i) => {
    // TODO: check for name duplicate
    // snippetDescr
    const snippetType = [undefined, 'scope', 'buy', 'sell', 'amount']
    dispatch(submitSnippet(snippetName[i], snippetDescr[i], snippetType[i], editorValue[i]))
    handleSnippetSubmittionChange(i, true);
  };

  const saveAlgorithmAsDraft = () => {
    localStorage.setItem(
      algorithmName,
      JSON.stringify({
        code: editorValue,
        name: snippetName,
      }),
    );
    // TODO: message?
    window.alert('code saved to localstorage');
  };

  const handleSubmitAlgorithm = () => {
    // TODO: check for name duplicate
    // TODO: message?
    if (
      snippetSubmitted[1] === true &&
      snippetSubmitted[2] === true &&
      snippetSubmitted[3] === true &&
      snippetSubmitted[1] === true
    ) {
      if (Math.random() > 0.5) {
        window.alert('duplicate name, please change snippet name');
      } else {
        window.alert('algorithm submitted');
      }
    } else {
      window.alert('Please submit algorithms first');
    }
  };

  return (
    <div className={classes.root}>
      <MenuBar/>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={4} style={{backgroundColor: '#eeeeee'}}>
          API DOC
        </Grid>
        <Grid item xs={8}>
          <Paper elevation={1}>
            <Paper elevation={3} style={{marginBottom: 5, marginTop: 5}}>
              <Tabs
                value={TabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab id='snippet_1' label="Snippet: Scope" value={1}/>
                <Tab id='snippet_2' label="Snippet: Buy" value={2}/>
                <Tab id='snippet_3' label="Snippet: Sell" value={3}/>
                <Tab id='snippet_4' label="Snippet: Amount" value={4}/>
              </Tabs>
            </Paper>
            <div style={{margin: 10}}>
              <TextField
                id="snippet_name"
                variant="outlined"
                size={'small'}
                label="snippet name"
                disabled={snippetSubmitted[TabValue]}
                fullWidth
                value={snippetName[TabValue]}
                onChange={(e) => {
                  setSnippetName({
                    ...snippetName,
                    [TabValue]: e.target.value,
                  });
                }}
              />
            </div>
            <div style={{margin: 10}}>
              <TextField
                id="snippet_descr"
                variant="outlined"
                size={'small'}
                label="snippet Description"
                disabled={snippetSubmitted[TabValue]}
                fullWidth
                value={snippetDescr[TabValue]}
                onChange={(e) => {
                  setSnippetDescr({
                    ...snippetDescr,
                    [TabValue]: e.target.value,
                  });
                }}
              />
            </div>
            <CodeMirror
              value={editorValue[TabValue]}
              options={{
                mode: 'python',
                theme: 'material',
                lineNumbers: true,
                readOnly: snippetSubmitted[TabValue]
              }}
              onBeforeChange={
                /* istanbul ignore next */
                (editor, data, value) => {
                handleEditorValueChange(TabValue, value);
              }}
              // onChange={(editor, data, value) => {
              //   // setEditor1Value(value);
              // }}
            />
            <ButtonGroup color="primary" style={{margin: 10}}>
              <Button
                id='import_algorithm'
                size={'small'}
                disabled={snippetSubmitted[TabValue]}
                onClick={() => {
                  handleImport(TabValue);
                }}
              >
                Import
              </Button>
              {/*<Button*/}
              {/*  id='snippet_validate'*/}
              {/*  size={'small'}*/}
              {/*  disabled={*/}
              {/*    snippetName[TabValue] === '' || snippetValidated[TabValue]*/}
              {/*  }*/}
              {/*  onClick={() => {*/}
              {/*    handleValidate(TabValue);*/}
              {/*  }}*/}
              {/*>*/}
              {/*  Validate*/}
              {/*</Button>*/}
              <Button
                id='submit_snippet'
                size={'small'}
                disabled={
                  // snippetName[TabValue] === '' || !snippetValidated[TabValue]
                  snippetName[TabValue] === '' || snippetSubmitted[TabValue]
                }
                onClick={() => {
                  handleSubmitSnippet(TabValue);
                }}
              >
                Submit Snippet
              </Button>
            </ButtonGroup>
            <Typography id='status_message' component="span" style={{color: '#ff0000'}}>
              {/*{`Status: ${snippetValidated[TabValue] === true*/}
              {/*  ? snippetSubmitted[TabValue] === true*/}
              {/*    ? 'Submitted'*/}
              {/*    : 'Not submitted'*/}
              {/*  : 'Unvalidated'}`*/}
              {/*}*/}
              {`Status: ${snippetSubmitted[TabValue] === true
                ? 'Submitted'
                : 'Not submitted'}`
              }
            </Typography>
          </Paper>

          <Grid container justify="space-between" style={{padding: 10}}>
            <Grid item>
              <TextField
                id="algorithm_name"
                variant="outlined"
                label="Algorithm name"
                size={'small'}
                style={{marginRight: 10}}
                value={algorithmName}
                onChange={(e) => {
                  setAlgorithmName(e.target.value);
                }}
              />
              <ButtonGroup color="primary" style={{marginTop: 2}}>
                <Button
                  id='save_algorithm'
                  onClick={() => {
                    saveAlgorithmAsDraft();
                  }}
                >
                  Save As Draft
                </Button>
                <Button
                  id='submit_algorithm'
                  disabled={algorithmName === ''}
                  onClick={() => {
                    handleSubmitAlgorithm();
                  }}
                >
                  Submit as Algorithm
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item>
              <Button size={'small'} color={'secondary'} variant={'contained'}>
                Back
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={importModalOpen}
        onClose={
          /* istanbul ignore next */
          () => {
          setImportModalOpen(false);
        }}
      >
        <Paper style={{width: '100%', height: 400}}>{'asdasd'}</Paper>
      </Dialog>
    </div>
  );
};

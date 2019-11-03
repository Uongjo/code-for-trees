import React, { Component } from 'react';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-xcode";

class Problem extends Component {
  state = {}

  constructor(props) {
    super(props);
    this.state = {
      code: "",
      language: "python",
      codeHeader: {
        python: '',
        java: 'public static void main(String[] args) {\n\n}',
        javascript: '',
      },
      loading: false,
      success: ""
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.code === nextState.code;
  }

  onChange = (code) => {
    this.setState({ code });
  }

  onSubmit = async () => {
    console.log(this.state.code);
    const url = "";
    await fetch(url, {
      method: 'POST',
      body: this.state.code,
    });

    // setTimeout(refresh, 5000);
    this.setState({ loading: true });
  }

  getEditorClasses = () => {
    let classes = "editor-container";
    if(this.state.loading) {
      classes += " overlay";
    }
    if(this.state.success !== "") {
      if(this.state.success) {
        classes += " success";
      } else {
        classes += " fail";
      }
    }
    return classes
  }

  render() { 
    return (
      <div id="problem">
        <div className="left-panel">
          <h1 className="problem-title">TWO SUM</h1>
          <hr/>
          <p>Given an array of integers, return indices of the two numbers such that they add up to a specific target.</p>
          <p>You may assume that each input would have exactly one solution, and you may not use the same element twice.</p>
          <h2>Example</h2>
          <div className="example">
            <p>Given <code>nums = [2, 7, 11, 15], target = 9,</code></p>

            <p>Because <code>nums[0] + nums[1] = 2 + 7 = 9,</code></p>
            <p><code>return [0, 1].</code></p>
          </div>
        </div>
        <div className="right-panel">
          <select onChange={(e) => this.setState({ language: e.target.value })}>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
          </select>
          <div className={this.getEditorClasses()}>
            {this.state.loading ? 
              <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" className="loading-icon"/> :
              ""
            }
            <AceEditor
              mode={this.state.language}
              theme="xcode"
              width="100%"
              height="500px"
              value={this.state.code === "" ? this.state.codeHeader[this.state.language] : this.state.code }
              showPrintMargin={false}
              editorProps={{ $blockScrolling: true }}
              onChange={this.onChange}
            />
          </div>
          <button onClick={() => this.onSubmit()}>SUBMIT</button>
        </div>
      </div>
    );
  }
}
 
export default Problem;
import React, { Component } from 'react';

class SideBar extends Component {
  render() {
    return (
        <div class="jss103 jss102">
            <div class="jss206" aria-hidden="true" style={{opacity: 1, willChange: "opacity", transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"}}></div>
            <div class="jss10 jss28 jss93 jss94" direction="right" role="document" tabindex="-1" style={{transform: "translate(0px, 0px)", transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms"}}>
                <nav class="jss208 jss209" style={{width: "70vw", maxWidth: 300}}>
                    <span>
                        <div tabindex="0" class="jss47 jss212 jss215 jss219 jss220" role="button">
                        <svg class="jss50 jss223" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"></path>
                        </svg>
                        <div onClick={this.props.openQuestions} class="jss224"><span class="jss66 jss73 jss227">Questions</span></div>
                        <span class="jss59"></span>
                        </div>
                    </span>
                    <span>
                        <div tabindex="0" class="jss47 jss212 jss215 jss219 jss220" role="button">
                        <svg class="jss50 jss223" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M16 6V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H2v13c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6h-6zm-6-2h4v2h-4V4zM9 18V9l7.5 4L9 18z"></path>
                        </svg>
                        <div onClick={this.props.openShop} class="jss224"><span class="jss66 jss73 jss227">Shop</span></div>
                        <span class="jss59"></span>
                        </div>
                    </span>
                </nav>
            </div>
        </div>
    );
  }
}

export default SideBar;

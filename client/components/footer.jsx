import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
// function Footer() {
  }

  render() {
    let checkFooter = this.props.searchType === "profession" ? 'inherit' : 'inherit';



  return (
    <footer className="fadeIn footer background-dark py-5" style={{ position: `${checkFooter}`}}>

          <img src="images/logo-reverse.png" width="60" height="60" alt="" /><span className="mt-1"> Books For Your Profession</span>
          <h6 className="text-center mb-0 mt-4">A Griego Enterprises Brand</h6>

    </footer>
  );
}


}

export default Footer;

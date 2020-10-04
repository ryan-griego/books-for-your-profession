import React from 'react';

class ProfessionBookListItem extends React.Component {

  render() {
    return (
      <>
        <div className="col-md-4 mb-4">
          <div className="card" style={{ width: '18rem' }} onClick={this.props.view} id={this.props.bookId}>
            <img src={this.props.product.image} className="card-img-top"></img>
            <div className="card-body">
              <h5 className="card-title">{this.props.name}</h5>
              <p className="card-text">{this.props.author}</p>
              <p className="card-text">{this.props.shortDescription}</p>
              <a href="#" className="btn btn-primary">More information</a>

            </div>
          </div>
        </div>
      </>
    );

  }
}

export default ProfessionBookListItem;

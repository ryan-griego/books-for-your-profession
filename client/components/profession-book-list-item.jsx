import React from 'react';

class ProfessionBookListItem extends React.Component {


  render() {
    return (
      <>
        <div className="card" id={this.props.bookId}>
            <div className="row no-gutters">
              <div className="col-sm-5">
                <img className="card-img" src="https://static.thenounproject.com/png/2009843-200.png" alt="Book title" />
              </div>
              <div className="col-sm-7">
                <div className="card-body">
                  <h2 className="card-rank">#</h2>
                <h5 className="card-title">{this.props.name}</h5>
                <p className="card-text">{this.props.author}</p>
                <p className="card-text">{this.props.shortDescription}</p>

                  <a href="#" className="btn btn-primary">More information</a>
                </div>
              </div>
            </div>
          </div>
      </>
    )


  }
}

export default ProfessionBookListItem;

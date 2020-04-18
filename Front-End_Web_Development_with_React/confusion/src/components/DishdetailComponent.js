import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,  CardTitle } from 'reactstrap';

class Dishdetails extends Component {
   

    formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    renderDish(dish) {
        if (dish != null) 
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle><b>{dish.name}</b></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }  
    
    renderDishComments(dish) {
        if (dish != null) {
            const commentlist = dish.comments.map((comment) => {
                return (
                    <div>
                        <p style={{fontWeight: "bold"}}>{comment.comment}</p>
                        <p>By {comment.author} on: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        <hr style={{borderColor: "#000"}} />
                    </div>
                )
            })
            return(
                <div>
                    <h4>Comments for {dish.name}</h4><br />
                    {commentlist}
                </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    }

    render() {
        if (this.props.currentdish != null) {
            return (
                <div class="container">
                    <div className="row">
                        <div  className="col-12 col-md-5 m-1 col-xs-12">
                            {this.renderDish(this.props.currentdish)}
                        </div>
                        <div  className="col-12 col-md-5 m-1 col-xs-12">
                            {this.renderDishComments(this.props.currentdish)}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default Dishdetails
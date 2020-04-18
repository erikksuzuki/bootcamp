import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,  CardTitle } from 'reactstrap';

    function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    function RenderDish({dish}) {
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
    
    function RenderDishComments({dish}) {
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
    }

    const DishDetails = (props) => {

        if (props.currentdish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <div  className="col-12 col-md-5 m-1 col-xs-12">
                            <RenderDish dish={props.currentdish} />
                        </div>
                        <div  className="col-12 col-md-5 m-1 col-xs-12">
                            <RenderDishComments dish={props.currentdish} />
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

export default DishDetails
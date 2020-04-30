import React, { Component } from "react";
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button } from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});

function RenderDish(props) {
  const dish = props.dish;

  if (dish != null) {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Icon
              raised
              reverse
              name={props.favorite ? "heart" : "heart-o"}
              type="font-awesome"
              color="#f50"
              onPress={() => (props.favorite ? console.log("Already favorite") : props.onPress())}
            />
            <Icon
              raised
              reverse
              name={"pencil"}
              type="font-awesome"
              color="#512DA8"
              onPress={() => props.onSelect()}
            />
          </View>
        </Card>
      </Animatable.View>
    );
  } else {
    return <View></View>;
  }
}

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>{"-- " + item.author + ", " + item.date} </Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      author: "",
      comment: "",
      showModal: false,
    };
  }

  static navaigationOptions = {
    title: "Dish Details",
  };

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComments(dishId) {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
    this.props.postComment(dishId, this.state.rating, this.state.comment, this.state.author);
  }

  render() {
    const dishId = this.props.navigation.getParam("dishId", "");
    return (
      <ScrollView>
        <Modal animation={"slide"} transparent={false} visible={this.state.showModal}>
          <View style={styles.modal}>
            <Rating
              showRating
              fractions={0}
              startingValue={0}
              onFinishRating={(rating) => this.setState({ rating: rating })}
            />
            <Input
              placeholder="Author"
              leftIcon={<Icon name="user-o" type="font-awesome" />}
              onChangeText={(value) => this.setState({ author: value })}
            />
            <Input
              placeholder="Comment"
              leftIcon={<Icon name="comment-o" type="font-awesome" size={24} />}
              onChangeText={(value) => this.setState({ comment: value })}
            />
            <Button color="#512DA8" title="SUBMIT" onPress={() => this.handleComments(dishId)} />
            <Button onPress={() => this.toggleModal()} color="#989898" title="CANCEL" />
          </View>
        </Modal>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          onSelect={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 20,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
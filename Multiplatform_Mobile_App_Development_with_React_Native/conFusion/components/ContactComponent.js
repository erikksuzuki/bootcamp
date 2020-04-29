import React, { Component } from "react";
import { ScrollView, Text, FlatList } from "react-native";
import { ListItem, Card } from "react-native-elements";

class Contact extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Contact",
  };

  render() {
    return (
      <ScrollView>
        <Card title="Contact Information">
          <Text style={{ margin: 10 }}>
            121, Clear Water Bay Road
            {"\n"}
            Clear Water Bay, Kowloon
            {"\n"}
            HONG KONG
            {"\n"}
            Tel: +852 1234 5678
            {"\n"}
            Fax: +852 8765 4321
            {"\n"}
            Email:confusion@food.net
          </Text>
        </Card>
      </ScrollView>
    );
  }
}

export default Contact;

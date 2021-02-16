import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import EventCard from "./EventCard";
import ActionButton from "react-native-action-button";
import { getEvents } from "./api";

// could import styles from styles file
const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#F3F3F3",
  },
});

class EventList extends Component {
  state = {
    events: [],
  };

  componentDidMount() {
    // this might be better used as a side effect?
    setInterval(() => {
      this.setState({
        events: this.state.events.map((evt) => ({
          ...evt,
          timer: Date.now(),
        })),
      });
    }, 1000);

    /*

    could use this instead
    setInterval(() => {
        this.setState({
          events: [...this.state.events],
        });
      }, 1000);
      
    */

    getEvents(); //.then((events) => this.setState({ events }));
  }

  handleAddEvent = () => {
    this.props.navigation.navigate("form");
  };

  render() {
    return [
      <FlatList
        key="flatlist"
        data={this.state.events}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />,
      <ActionButton
        key="fab"
        onPress={this.handleAddEvent}
        buttonColor="rgba(231, 76, 60, 1)"
      />,
    ];
  }
}

export default EventList;

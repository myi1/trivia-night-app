import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Categories extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.getCategories();
  }

  getCategories() {
    axios
      .get("http://jservice.io/api/categories?count=8")
      .then((response) => {
        console.log(response.data);
        this.setState({
          categories: response.data,
        });
        console.log(this.state.categories);
      })
      .catch((err) => {
        console.log("API Request Failed: ", err);
      });
  }
  render() {
    const { categories } = this.state;
    if (categories.length === 0) {
      return <p>Loading Categories...</p>;
    }

    return (
      <div className='categories'>
        <h2 className='categories__header'>Choose A Category!</h2>

        {categories.map((category) => {
          return (
            <Link
              className='categories__category'
              to={"/category/" + category.id}
              key={category.id}>
              <p>{category.title}</p>
            </Link>
          );
        })}
      </div>
    );
  }
}

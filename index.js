/**
 * Date: July 14, 2020
 *
 * This is the index.js page of my second creative project. It contains behaviors that
 * allow the user to interact with the to-do list.
 */
"use strict";

(function() {

  const ENTER_KEY = 13;

  window.addEventListener("load", init);

  /**
   * Once the webpage is loaded, adds a listener that adds a new to-do list to the workspace when
   * the add new list (plus) button is clicked once
   */
  function init() {
    id("add").addEventListener("click", newList);
  }

  /**
   * Creates a new to-do list with a list title input box and a task input box when the add new list
   * button is clicked
   *
   * input placeholder resource:
   * https://stackoverflow.com/questions/781473/how-to-create-a-label-inside-an-input-element
   * enter key press detection resource:
   * https://www.youtube.com/watch?v=Ezj00-Gbdl0
   */
  function newList() {
    let article = gen("article");
    let titleInput = gen("input");
    let taskInput = gen("input");
    let ul = gen("ul");

    article.classList.add("list");

    titleInput.type = "text";
    titleInput.placeholder = "Title";
    titleInput.classList.add("title-in");
    article.appendChild(titleInput);
    titleInput.addEventListener("keyup", (event) => {
      if (event.keyCode === ENTER_KEY) {
        addTitle(titleInput);
      }
    });

    taskInput.type = "text";
    taskInput.placeholder = "+ New task";
    taskInput.classList.add("task-in");
    article.appendChild(taskInput);
    article.appendChild(ul);
    taskInput.addEventListener("keyup", (event) => {
      if (event.keyCode === ENTER_KEY) {
        addTask(taskInput);
      }
    });

    qs("section").insertBefore(article, id("add"));

    article.addEventListener("dblclick", removeObj);
  }

  /**
   * Replaces the title input box with user's title input when the user presses the enter key on the
   * keyboard while the title input box is selected
   *
   * @param {object} input - text input object containing user input (list title)
   */
  function addTitle(input) {
    let h3 = gen("h3");
    h3.textContent = input.value;
    input.parentNode.replaceChild(h3, input);
  }

  /**
   * Adds the user's text input into the task list as a new task (with a checkbox) when the user
   * presses the enter key on the keyboard while the task input box is selected
   *
   * JS checkboxes resource:
   * https://stackoverflow.com/questions/866239/creating-the-checkbox-dynamically-using-javascript
   *
   * @param {object} input - text input object containing user input (new task)
   */
  function addTask(input) {
    let item = gen("li");
    let box = gen("input");
    let text = gen("p");
    box.classList.add("box");
    box.type = "checkbox";
    text.textContent = input.value;
    input.value = "";
    box.addEventListener("click", removeObj);
    item.appendChild(box);
    item.appendChild(text);
    input.nextElementSibling.appendChild(item);
  }

  /**
   * Deletes a task when its checkbox is unchecked or an entire to-do list when it is double-clicked
   */
  function removeObj() {
    if (this.classList.contains("box") && !this.checked) {
      this.parentNode.remove();
    } else if (this.classList.contains("list")) {
      this.remove(this);
    }
  }

  /** ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

})();
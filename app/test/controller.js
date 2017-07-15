import Ember from 'ember';

import {
  task,
  timeout
} from 'ember-concurrency';

export default Ember.Controller.extend({
  initialReadOffset: 0,
  loadHorizon: 10,
  index: 0,


  actions: {
    test: function () {
      console.log('test');
      this.get("loadData").perform();
    },
    fetch: function (pageOffset, pageSize, stats) {
      //   stats.totalPages = 100;
      console.log("test");
      return this.get("loadData").perform();
    },

    initializeReadOffset(dataset) {
      let initReadOffset = this.get('initialReadOffset');
      dataset.setReadOffset(initReadOffset);
    },
  },


  fetch: function (pageOffset, pageSize, stats) {
    // stats.totalPages = 100;
    console.log("test");
    return this.get("loadData").perform();
  },

  createData: function () {
    let index = this.get('index');
    console.log("fetching data ", index);
    let result = Ember.A();
    // generate some data to "load"
    for (var i = index; i < (index + 10); i++) {
      result.pushObject(Ember.Object.create({
        name: i,
        description: "This is a test " + i,
      }));
    }
    this.set("index", index + 10);
    return result;
  },

  loadData: task(function* () {
    yield timeout(10);
    return this.createData();
  }),

});

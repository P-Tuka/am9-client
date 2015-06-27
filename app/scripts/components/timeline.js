'use strict';

import {stores} from '../models/stores';

var timeline = new Vue({
  el: '#timeline',

  data: {
    start: new Date('2015-06-27T00:00+0900').getTime(),
    time: 1000 * 60 * 60 * 24,
    step: 1000 * 60 * 15,
    stepLength: 18,

    resources: null
  },

  created: function() {
    stores.timeline.on('fetch', (data) => {
      this.refresh(data);
    });
  },

  computed: {
    height: function() {
      return this.time / this.step * this.stepLength;
    }
  },

  methods: {
    refresh: function(timeline) {
      if (timeline.start) {
        this.start = timeline.start;
      }
      if (timeline.time) {
        this.time = timeline.time;
      }
      if (timeline.resources) {
        this.resources = timeline.resources;
      }
    }
  }
});

timeline.refresh({
  resources: [
    {
      do: [{
        body: 'body 1',
        start: new Date('2015-06-27T03:00+0900').getTime(),
        time: 1000 * 60 * 60 * 2
      }]
    },
    {
      do: [{
        body: 'body 2',
        start: new Date('2015-06-27T04:00+0900').getTime(),
        time: 1000 * 60 * 60 * 2
      }]
    }
  ]
});
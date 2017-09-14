import { Component, OnInit } from '@angular/core';


import * as moment from 'moment';
import * as d3 from 'd3';


import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  private chartFromData = {
    setings: {
        graph_type: {
            id: 1,
            description: "linijski"
        },
        line: {
            id: 1,
            description: "polna"
        },
        color: {
            id: 9,
            description: "ff0000"
        }
    },
    dataSet: [

        {
            date: "2017-08-28T07:40:00",
            history: 0,
            status: 0,
            value: 99,
            modified: "2017-08-28T07:44:47"
        },
        {
            date: "2017-08-28T07:30:00",
            history: 0,
            status: 0,
            value: 91,
            modified: "2017-08-28T07:34:09"
        },
        {
            date: "2017-08-28T07:20:00",
            history: 0,
            status: 0,
            value: 89,
            modified: "2017-08-28T07:24:17"
        },
        {
            date: "2017-08-28T07:10:00",
            history: 0,
            status: 0,
            value: 105,
            modified: "2017-08-28T07:14:33"
        },
        {
            date: "2017-08-28T07:00:00",
            history: 0,
            status: 0,
            value: 200,
            modified: "2017-08-28T07:04:14"
        },
        {
            date: "2017-08-28T06:50:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T06:54:11"
        },
        {
            date: "2017-08-28T06:40:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T06:44:11"
        },
        {
            date: "2017-08-28T06:30:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T06:34:16"
        },
        {
            date: "2017-08-28T06:20:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T06:24:09"
        },
        {
            date: "2017-08-28T06:10:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T06:14:18"
        },
        {
            date: "2017-08-28T06:00:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T06:04:09"
        },
        {
            date: "2017-08-28T05:50:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T05:54:10"
        },
        {
            date: "2017-08-28T05:40:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T05:44:09"
        },
        {
            date: "2017-08-28T05:30:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T05:34:09"
        },
        {
            date: "2017-08-28T05:20:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T05:24:09"
        },
        {
            date: "2017-08-28T05:10:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T05:14:09"
        },
        {
            date: "2017-08-28T05:00:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T05:04:10"
        },
        {
            date: "2017-08-28T04:50:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T04:54:09"
        },
        {
            date: "2017-08-28T04:40:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T04:44:09"
        },
        {
            date: "2017-08-28T04:30:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T04:34:09"
        },
        {
            date: "2017-08-28T04:20:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T04:24:09"
        },
        {
            date: "2017-08-28T04:10:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T04:14:10"
        },
        {
            date: "2017-08-28T04:00:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T04:04:10"
        },
        {
            date: "2017-08-28T03:50:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T03:54:08"
        },
        {
            date: "2017-08-28T03:40:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T03:44:09"
        },
        {
            date: "2017-08-28T03:30:00",
            history: 0,
            status: 0,
            value: 81,
            modified: "2017-08-28T03:34:09"
        },
        {
            date: "2017-08-28T03:20:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-28T03:24:08"
        },
        {
            date: "2017-08-28T03:10:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-28T03:14:08"
        },
        {
            date: "2017-08-28T03:00:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-28T03:04:09"
        },
        {
            date: "2017-08-28T02:50:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-28T02:54:09"
        },
        {
            date: "2017-08-28T02:40:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-28T02:45:07"
        },
        {
            date: "2017-08-28T02:30:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-28T02:34:09"
        },
        {
            date: "2017-08-28T02:20:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-28T02:24:26"
        },
        {
            date: "2017-08-28T02:10:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-28T02:14:09"
        },
        {
            date: "2017-08-28T02:00:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-28T02:04:10"
        },
        {
            date: "2017-08-28T01:50:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-28T01:56:08"
        },
        {
            date: "2017-08-28T01:40:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-28T01:44:08"
        },
        {
            date: "2017-08-28T01:30:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-28T01:32:07"
        },
        {
            date: "2017-08-28T01:20:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-28T01:24:08"
        },
        {
            date: "2017-08-28T01:10:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-28T01:14:10"
        },
        {
            date: "2017-08-28T01:00:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-28T01:04:09"
        },
        {
            date: "2017-08-28T00:50:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-28T00:54:19"
        },
        {
            date: "2017-08-28T00:40:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-28T00:44:08"
        },
        {
            date: "2017-08-28T00:30:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-28T00:34:08"
        },
        {
            date: "2017-08-28T00:20:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-28T00:23:32"
        },
        {
            date: "2017-08-28T00:10:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-28T00:14:12"
        },
        {
            date: "2017-08-28T00:00:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-28T00:04:09"
        },
        {
            date: "2017-08-27T23:50:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-27T23:54:10"
        },
        {
            date: "2017-08-27T23:40:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-27T23:44:09"
        },
        {
            date: "2017-08-27T23:30:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-27T23:34:09"
        },
        {
            date: "2017-08-27T23:20:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-27T23:24:10"
        },
        {
            date: "2017-08-27T23:10:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-27T23:14:09"
        },
        {
            date: "2017-08-27T23:00:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-27T23:04:09"
        },
        {
            date: "2017-08-27T22:50:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T22:54:09"
        },
        {
            date: "2017-08-27T22:40:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T22:43:35"
        },
        {
            date: "2017-08-27T22:30:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T22:36:07"
        },
        {
            date: "2017-08-27T22:20:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T22:24:10"
        },
        {
            date: "2017-08-27T22:10:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T22:14:08"
        },
        {
            date: "2017-08-27T22:00:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T22:04:09"
        },
        {
            date: "2017-08-27T21:50:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T21:54:10"
        },
        {
            date: "2017-08-27T21:40:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T21:44:14"
        },
        {
            date: "2017-08-27T21:30:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T21:35:07"
        },
        {
            date: "2017-08-27T21:20:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T21:24:09"
        },
        {
            date: "2017-08-27T21:10:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T21:14:08"
        },
        {
            date: "2017-08-27T21:00:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T21:04:09"
        },
        {
            date: "2017-08-27T20:50:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T20:54:09"
        },
        {
            date: "2017-08-27T20:40:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T20:44:08"
        },
        {
            date: "2017-08-27T20:30:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T20:34:09"
        },
        {
            date: "2017-08-27T20:20:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T20:24:09"
        },
        {
            date: "2017-08-27T20:10:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T20:14:08"
        },
        {
            date: "2017-08-27T20:00:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T20:05:06"
        },
        {
            date: "2017-08-27T19:50:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T19:54:09"
        },
        {
            date: "2017-08-27T19:40:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T19:44:08"
        },
        {
            date: "2017-08-27T19:30:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T19:34:08"
        },
        {
            date: "2017-08-27T19:20:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T19:24:09"
        },
        {
            date: "2017-08-27T19:10:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T19:14:13"
        },
        {
            date: "2017-08-27T19:00:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T19:04:08"
        },
        {
            date: "2017-08-27T18:50:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T18:54:09"
        },
        {
            date: "2017-08-27T18:40:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T18:44:08"
        },
        {
            date: "2017-08-27T18:30:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T18:34:08"
        },
        {
            date: "2017-08-27T18:20:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T18:24:09"
        },
        {
            date: "2017-08-27T18:10:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T18:14:09"
        },
        {
            date: "2017-08-27T18:00:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T18:05:07"
        },
        {
            date: "2017-08-27T17:50:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T17:54:08"
        },
        {
            date: "2017-08-27T17:40:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T17:44:08"
        },
        {
            date: "2017-08-27T17:30:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T17:34:08"
        },
        {
            date: "2017-08-27T17:20:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T17:24:09"
        },
        {
            date: "2017-08-27T17:10:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T17:14:08"
        },
        {
            date: "2017-08-27T17:00:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T17:03:17"
        },
        {
            date: "2017-08-27T16:50:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T16:54:09"
        },
        {
            date: "2017-08-27T16:40:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T16:44:08"
        },
        {
            date: "2017-08-27T16:30:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T16:34:08"
        },
        {
            date: "2017-08-27T16:20:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T16:24:09"
        },
        {
            date: "2017-08-27T16:10:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T16:14:08"
        },
        {
            date: "2017-08-27T16:00:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T16:03:16"
        },
        {
            date: "2017-08-27T15:50:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T15:54:09"
        },
        {
            date: "2017-08-27T15:40:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T15:44:08"
        },
        {
            date: "2017-08-27T15:30:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T15:34:08"
        },
        {
            date: "2017-08-27T15:20:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T15:24:08"
        },
        {
            date: "2017-08-27T15:10:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T15:14:09"
        },
        {
            date: "2017-08-27T15:00:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T15:04:08"
        },
        {
            date: "2017-08-27T14:50:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T14:54:10"
        },
        {
            date: "2017-08-27T14:40:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T14:44:09"
        },
        {
            date: "2017-08-27T14:30:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T14:34:08"
        },
        {
            date: "2017-08-27T14:20:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T14:24:09"
        },
        {
            date: "2017-08-27T14:10:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T14:14:09"
        },
        {
            date: "2017-08-27T14:00:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T14:04:08"
        },
        {
            date: "2017-08-27T13:50:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T13:54:08"
        },
        {
            date: "2017-08-27T13:40:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T13:44:08"
        },
        {
            date: "2017-08-27T13:30:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T13:34:07"
        },
        {
            date: "2017-08-27T13:20:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T13:24:13"
        },
        {
            date: "2017-08-27T13:10:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-27T13:14:08"
        },
        {
            date: "2017-08-27T13:00:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T13:03:17"
        },
        {
            date: "2017-08-27T12:50:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T12:54:09"
        },
        {
            date: "2017-08-27T12:40:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T12:44:08"
        },
        {
            date: "2017-08-27T12:30:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T12:35:07"
        },
        {
            date: "2017-08-27T12:20:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-27T12:24:13"
        },
        {
            date: "2017-08-27T12:10:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T12:14:08"
        },
        {
            date: "2017-08-27T12:00:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-27T12:03:16"
        },
        {
            date: "2017-08-27T11:50:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T11:53:17"
        },
        {
            date: "2017-08-27T11:40:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-27T11:44:09"
        },
        {
            date: "2017-08-27T11:30:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T11:34:08"
        },
        {
            date: "2017-08-27T11:20:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-27T11:24:08"
        },
        {
            date: "2017-08-27T11:10:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T11:14:08"
        },
        {
            date: "2017-08-27T11:00:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-27T11:04:09"
        },
        {
            date: "2017-08-27T10:50:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-27T10:54:08"
        },
        {
            date: "2017-08-27T10:40:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-27T10:44:08"
        },
        {
            date: "2017-08-27T10:30:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T10:34:09"
        },
        {
            date: "2017-08-27T10:20:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T10:24:08"
        },
        {
            date: "2017-08-27T10:10:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T10:14:08"
        },
        {
            date: "2017-08-27T10:00:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T10:04:08"
        },
        {
            date: "2017-08-27T09:50:00",
            history: 0,
            status: 0,
            value: 83,
            modified: "2017-08-27T09:54:08"
        },
        {
            date: "2017-08-27T09:40:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T09:44:08"
        },
        {
            date: "2017-08-27T09:30:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T09:34:09"
        },
        {
            date: "2017-08-27T09:20:00",
            history: 0,
            status: 0,
            value: 82,
            modified: "2017-08-27T09:24:08"
        },
        {
            date: "2017-08-27T09:10:00",
            history: 0,
            status: 0,
            value: 2,
            modified: "2017-08-27T09:14:08"
        },
        {
            date: "2017-08-27T09:00:00",
            history: 0,
            status: 0,
            value: 45,
            modified: "2017-08-27T09:04:08"
        },
        {
            date: "2017-08-27T08:50:00",
            history: 0,
            status: 0,
            value: 33,
            modified: "2017-08-27T08:54:07"
        }
    ]
  }

  constructor() { }


  ngOnInit() {
    this.getKolomon()
  }
  private kolomon: Array<any>;
  private datum;
 
 
  getKolomon() {
      //podatke iz baze preuredi v array { name: , values: {x:, y:}}
      //  
      this.chartFromData.dataSet= this.chartFromData.dataSet;
      this.kolomon=[{
          name: this.chartFromData.setings,
          values: this.chartFromData.dataSet.map(pod => {
              return {
                  date: pod.date,
                  temperature: pod.value
              }
          })
      }]
      this.kolomon.push({
          name:{ graph_type: {
              id: 3,
              description: "stolpični"
          },
          line: {
              id: 1,
              description: "polna"
          },
          color: {
              id: 10,
              description: "00ff00"
          }},
          values: this.chartFromData.dataSet.map((pod,i) => {
              return {
                  date:  pod.date,
                  temperature: i
              }
          })
      })
      this.kolomon.push({
          name: { graph_type: {
              id: 2,
              description: "tockovni"
          },
          line: {
              id: 1,
              description: "polna"
          },
          color: {
              id: 4,
              description: "008000"
          }},
          values: this.chartFromData.dataSet.map((pod,i) => {
              return {
                  date:  pod.date,
                  temperature: this.chartFromData.dataSet.length-0.5*i
              }
          })
      })

  }

}

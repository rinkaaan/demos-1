// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
export const browserTimeData = [
  { date: new Date(2020, 8, 16).getTime(), reddit: 120, github: 95, linkedin: 45, youtube: 180, yahoo: 30 },
  { date: new Date(2020, 8, 17).getTime(), reddit: 135, github: 110, linkedin: 60, youtube: 165, yahoo: 25 },
  { date: new Date(2020, 8, 18).getTime(), reddit: 105, github: 85, linkedin: 50, youtube: 200, yahoo: 35 },
  { date: new Date(2020, 8, 19).getTime(), reddit: 150, github: 100, linkedin: 70, youtube: 175, yahoo: 40 },
  { date: new Date(2020, 8, 20).getTime(), reddit: 140, github: 115, linkedin: 55, youtube: 190, yahoo: 28 },
  { date: new Date(2020, 8, 21).getTime(), reddit: 125, github: 90, linkedin: 65, youtube: 210, yahoo: 32 },
  { date: new Date(2020, 8, 22).getTime(), reddit: 130, github: 105, linkedin: 48, youtube: 185, yahoo: 27 },
  { date: new Date(2020, 8, 23).getTime(), reddit: 145, github: 120, linkedin: 75, youtube: 195, yahoo: 38 },
  { date: new Date(2020, 8, 24).getTime(), reddit: 110, github: 88, linkedin: 52, youtube: 170, yahoo: 33 },
  { date: new Date(2020, 8, 25).getTime(), reddit: 160, github: 125, linkedin: 80, youtube: 220, yahoo: 42 },
  { date: new Date(2020, 8, 26).getTime(), reddit: 115, github: 95, linkedin: 58, youtube: 180, yahoo: 29 },
  { date: new Date(2020, 8, 27).getTime(), reddit: 140, github: 110, linkedin: 62, youtube: 205, yahoo: 36 },
  { date: new Date(2020, 8, 28).getTime(), reddit: 125, github: 100, linkedin: 68, youtube: 175, yahoo: 31 },
  { date: new Date(2020, 8, 29).getTime(), reddit: 150, github: 115, linkedin: 72, youtube: 195, yahoo: 39 },
  { date: new Date(2020, 8, 30).getTime(), reddit: 135, github: 105, linkedin: 55, youtube: 185, yahoo: 34 },
];

export const browserTimeSeries = [
  {
    name: 'reddit',
    type: 'column',
    data: browserTimeData.map(datum => datum.reddit),
  },
  {
    name: 'github',
    type: 'column',
    data: browserTimeData.map(datum => datum.github),
  },
  {
    name: 'linkedin',
    type: 'column',
    data: browserTimeData.map(datum => datum.linkedin),
  },
  {
    name: 'youtube',
    type: 'column',
    data: browserTimeData.map(datum => datum.youtube),
  },
  {
    name: 'yahoo',
    type: 'column',
    data: browserTimeData.map(datum => datum.yahoo),
  },
] as const;

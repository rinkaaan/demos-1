export const apiRequestsData = [
  { date: new Date(2020, 8, 16, 0).getTime(), get: 1200, post: 850, put: 320, delete: 45 },
  { date: new Date(2020, 8, 16, 1).getTime(), get: 980, post: 720, put: 280, delete: 38 },
  { date: new Date(2020, 8, 16, 2).getTime(), get: 750, post: 550, put: 210, delete: 25 },
  { date: new Date(2020, 8, 16, 3).getTime(), get: 650, post: 480, put: 180, delete: 20 },
  { date: new Date(2020, 8, 16, 4).getTime(), get: 720, post: 520, put: 195, delete: 22 },
  { date: new Date(2020, 8, 16, 5).getTime(), get: 890, post: 640, put: 240, delete: 28 },
  { date: new Date(2020, 8, 16, 6).getTime(), get: 1100, post: 780, put: 290, delete: 35 },
  { date: new Date(2020, 8, 16, 7).getTime(), get: 1350, post: 920, put: 340, delete: 42 },
  { date: new Date(2020, 8, 16, 8).getTime(), get: 1600, post: 1100, put: 410, delete: 50 },
  { date: new Date(2020, 8, 16, 9).getTime(), get: 1850, post: 1280, put: 480, delete: 58 },
  { date: new Date(2020, 8, 16, 10).getTime(), get: 2100, post: 1450, put: 540, delete: 65 },
  { date: new Date(2020, 8, 16, 11).getTime(), get: 2250, post: 1580, put: 590, delete: 72 },
  { date: new Date(2020, 8, 16, 12).getTime(), get: 2400, post: 1700, put: 630, delete: 78 },
  { date: new Date(2020, 8, 16, 13).getTime(), get: 2350, post: 1650, put: 610, delete: 75 },
  { date: new Date(2020, 8, 16, 14).getTime(), get: 2200, post: 1520, put: 570, delete: 70 },
  { date: new Date(2020, 8, 16, 15).getTime(), get: 2050, post: 1420, put: 530, delete: 68 },
  { date: new Date(2020, 8, 16, 16).getTime(), get: 1950, post: 1350, put: 500, delete: 62 },
  { date: new Date(2020, 8, 16, 17).getTime(), get: 1800, post: 1250, put: 470, delete: 58 },
  { date: new Date(2020, 8, 16, 18).getTime(), get: 1650, post: 1150, put: 430, delete: 55 },
  { date: new Date(2020, 8, 16, 19).getTime(), get: 1500, post: 1050, put: 390, delete: 48 },
  { date: new Date(2020, 8, 16, 20).getTime(), get: 1300, post: 900, put: 340, delete: 42 },
  { date: new Date(2020, 8, 16, 21).getTime(), get: 1150, post: 800, put: 300, delete: 38 },
  { date: new Date(2020, 8, 16, 22).getTime(), get: 1000, post: 700, put: 260, delete: 32 },
  { date: new Date(2020, 8, 16, 23).getTime(), get: 900, post: 630, put: 235, delete: 28 },
];

export const apiRequestsSeries = [
  {
    name: 'GET',
    type: 'column',
    data: apiRequestsData.map(datum => datum.get),
  },
  {
    name: 'POST',
    type: 'column',
    data: apiRequestsData.map(datum => datum.post),
  },
  {
    name: 'PUT',
    type: 'column',
    data: apiRequestsData.map(datum => datum.put),
  },
  {
    name: 'DELETE',
    type: 'column',
    data: apiRequestsData.map(datum => datum.delete),
  },
] as const;

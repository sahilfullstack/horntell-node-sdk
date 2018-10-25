'use strict';

var Horntell = require('./src/Horntell/horntell.js');
Horntell.app.init('QBKEFW4G1NmMc559v1lDssivk2EESTwB73cSDs7K', '1V4o2LIpU8WoeWElDbOvWEURhIj2vOfM6HTuGzCb');
Horntell.app.setBase('http://api.horntell.dev');
Horntell.horn.toProfile('565e7c11c4e3edf5c886c8f2', {  
   format: 'link',
   type: 'info',
   bubble: true,
   text: 'Welcome campaign was fired.',
   html: '<strong>Welcome</strong> campaign was fired.',
   link: 'http://app.example.com/campaigns/welcome',
   new_window: true
}).then(function(response){
// console.log('success', response.getStatusCode());
}, function(error){
// console.log('error', error);
});


// Horntell.profile.find('009').then(function(response){
// console.log('success', response);
// }, function(error){console.log('error', error);});
// 
// 

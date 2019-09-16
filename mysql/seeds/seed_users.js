exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: '1',
          name: 'sample1',
          email: 'sample1@sample.com',
          password:
            '$2b$10$0BHTAHzQDR2PmP4A36oWBevCcB.y2LrnvlaAPM1MfMM1OCU2Dv3ZS',
          avatar: '',
          biography: ''
        },
        {
          id: '2',
          name: 'sample2',
          email: 'sample2@sample.com',
          password:
            '$2b$10$0BHTAHzQDR2PmP4A36oWBevCcB.y2LrnvlaAPM1MfMM1OCU2Dv3ZS',
          avatar: '',
          biography: ''
        },
        {
          id: '3',
          name: 'sample3',
          email: 'sample3@sample.com',
          password:
            '$2b$10$0BHTAHzQDR2PmP4A36oWBevCcB.y2LrnvlaAPM1MfMM1OCU2Dv3ZS',
          avatar: '',
          biography: ''
        },
        {
          id: '4',
          name: 'sample4',
          email: 'sample4@sample.com',
          password:
            '$2b$10$0BHTAHzQDR2PmP4A36oWBevCcB.y2LrnvlaAPM1MfMM1OCU2Dv3ZS',
          avatar: '',
          biography: ''
        },
        {
          id: '5',
          name: 'sample5',
          email: 'sample5@sample.com',
          password:
            '$2b$10$0BHTAHzQDR2PmP4A36oWBevCcB.y2LrnvlaAPM1MfMM1OCU2Dv3ZS',
          avatar: '',
          biography: ''
        }
      ])
    })
}

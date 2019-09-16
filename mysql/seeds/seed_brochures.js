exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('brochures')
    .del()
    .then(function() {
      const EVENTS_DAY1 = [
        {
          number: 1,
          type: 'star',
          title: 'title',
          overview: 'overview',
          time: '10:00'
        },
        {
          number: 2,
          type: 'star',
          title: 'title',
          overview: 'overview',
          time: '12:00'
        },
        {
          number: 3,
          type: '',
          title: 'title',
          overview: 'overview',
          time: '14:00'
        },
        {
          number: 4,
          type: 'star',
          title: 'title',
          overview: 'overview',
          time: '16:00'
        }
      ]

      const EVENTS_DAY2 = [
        {
          number: 5,
          type: 'star',
          title: 'title',
          overview: 'overview',
          time: '10:00'
        },
        {
          number: 6,
          type: 'star',
          title: 'title',
          overview: 'overview',
          time: '12:00'
        },
        {
          number: 7,
          type: '',
          title: 'title',
          overview: 'overview',
          time: '14:00'
        },
        {
          number: 8,
          type: 'star',
          title: 'title',
          overview: 'overview',
          time: '16:00'
        }
      ]

      const DAYS = [
        {
          number: 1,
          date: new Date(2019, 6, 1, 22, 30).toISOString().substr(0, 10),
          events: EVENTS_DAY1
        },
        {
          number: 2,
          date: new Date(2019, 6, 2, 22, 30).toISOString().substr(0, 10),
          events: EVENTS_DAY2
        }
      ]

      // Inserts seed entries
      return knex('brochures').insert([
        {
          id: '1',
          title: 'タイトル1',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'healing',
          is_public: true,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: true,
          share_id: 'sldfjadfa9w0f990u90',
          user_id: '1',
          status: 'draft'
        },
        {
          id: '2',
          title: 'タイトル2',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'nature',
          is_public: false,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: false,
          share_id: 'sldfjadfa9w0f990u911sdf',
          user_id: '2',
          status: 'published'
        },
        {
          id: '3',
          title: 'タイトル3',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'art',
          is_public: false,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: false,
          share_id: 'sldfjadfa9w0f990u911sdf',
          user_id: '3',
          status: 'published'
        },
        {
          id: '4',
          title: 'タイトル4',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'metoropolitan',
          is_public: false,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: false,
          share_id: 'sldfjadfa9w0f990u911sdf',
          user_id: '3',
          status: 'published'
        },
        {
          id: '5',
          title: 'タイトル5',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'gourmet',
          is_public: true,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: false,
          share_id: 'sldfjadfa9w0f990u911sdf',
          user_id: '3',
          status: 'published'
        },
        {
          id: '6',
          title: 'タイトル6',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'adventure',
          is_public: true,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: false,
          share_id: 'sldfjadfa9w0f990u911sdf',
          user_id: '4',
          status: 'published'
        },
        {
          id: '7',
          title: 'タイトル7',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'encounter',
          is_public: true,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: false,
          share_id: 'sldfjadfa9w0f990u911sdf',
          user_id: '2',
          status: 'published'
        },
        {
          id: '8',
          title: 'タイトル8',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'twilight',
          is_public: true,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: false,
          share_id: 'sldfjadfa9w0f990u911sdf',
          user_id: '3',
          status: 'published'
        },
        {
          id: '9',
          title: 'タイトル9',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'healing',
          is_public: false,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: false,
          share_id: 'sldfjadfa9w0f990u911sdf',
          user_id: '3',
          status: 'published'
        },
        {
          id: '10',
          title: 'タイトル10',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'nature',
          is_public: false,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: false,
          share_id: 'sldfjadfa9w0f990u911sdf',
          user_id: '1',
          status: 'published'
        },
        {
          id: '11',
          title: 'タイトル11',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'art',
          is_public: true,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: false,
          share_id: 'sldfjadfa9w0f990u911sdf',
          user_id: '2',
          status: 'published'
        },
        {
          id: '12',
          title: 'タイトル12',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'metoropolitan',
          is_public: true,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: false,
          share_id: 'sldfjadfa9w0f990u911sdf',
          user_id: '4',
          status: 'published'
        },
        {
          id: '13',
          title: 'タイトル13',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'gourmet',
          is_public: true,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: false,
          share_id: 'sldfjadfa9w0f990u911sdf',
          user_id: '3',
          status: 'published'
        },
        {
          id: '14',
          title: 'タイトル14',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'adventure',
          is_public: true,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: false,
          share_id: 'sldfjadfa9w0f990u911sdf',
          user_id: '2',
          status: 'published'
        },
        {
          id: '15',
          title: 'タイトル15',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'encounter',
          is_public: true,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: false,
          share_id: 'sldfjadfa9w0f990u911sdf',
          user_id: '1',
          status: 'published'
        },
        {
          id: '16',
          title: 'タイトル16',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'twilight',
          is_public: true,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: false,
          share_id: 'sldfjadfa9w0f990u911sdf',
          user_id: '1',
          status: 'published'
        },
        {
          id: '17',
          title: 'タイトル17',
          overview:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          theme: 'twilight',
          is_public: true,
          days: JSON.stringify(DAYS),
          memo:
            '私も事実むしろその誤解論というのの上でしなます。もし昔に使用院は何ともその乱暴でしでまでをするがならだっがは失敗帰っうましが、必ずにはしありでたらん。自分に見るでのはそのうち一遍をやはりたたで。',
          is_shared: false,
          share_id: 'sldfjadfa9w0f990u911sdf',
          user_id: '4',
          status: 'published'
        }
      ])
    })
}

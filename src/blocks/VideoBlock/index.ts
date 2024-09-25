import { Block } from 'payload';

const VideoBlock: Block = {
  slug: 'video-block',
  labels: {
    singular: 'Video Block',
    plural: 'Video Blocks',
  },
  fields: [
    {
      name: 'videos',
      label: 'Videos',
      type: 'array',
      fields: [
        {
          name: 'platform',
          label: 'Platform',
          type: 'select',
          options: [
            {
              label: 'YouTube',
              value: 'youtube',
            },
            {
              label: 'Dailymotion',
              value: 'dailymotion',
            },
            {
              label: 'Vimeo',
              value: 'vimeo',
            },
            {
              label: 'Twitch',
              value: 'twitch',
            },
            {
              label: 'Facebook',
              value: 'facebook',
            },
            {
              label: 'Custom',
              value: 'custom',
            },
          ],
         
        },
        {
          name: 'embedType',
          label: 'Embed Type',
          type: 'select',
          options: [
            {
              label: 'Iframe Embed',
              value: 'iframe',
            },
            {
              label: 'Direct Link',
              value: 'direct',
            },
          ],
         
        },
        {
          name: 'videoQuality',
          label: 'Video Quality',
          type: 'select',
          options: [
            {
              label: '144p',
              value: '144p',
            },
            {
              label: '280p',
              value: '280p',
            },
            {
              label: '360p',
              value: '360p',
            },
            {
              label: '480p',
              value: '480p',
            },
            {
              label: '720p',
              value: '720p',
            },
            {
              label: '1080p',
              value: '1080p',
            },
            {
              label: '1440p',
              value: '1440p',
            },
            {
              label: '4K',
              value: '4k',
            },
            {
              label: '8K',
              value: '8k',
            },
            {
              label: 'Auto',
              value: 'auto',
            },
          ],
         
        },
        {
          name: 'videoLink',
          label: 'Video Link',
          type: 'text',
         
        },
        {
          name: 'subtitles',
          label: 'Subtitles',
          type: 'array',
          fields: [
            {
              name: 'language',
              label: 'Language',
              type: 'text',
             
            },
            {
              name: 'url',
              label: 'Subtitle File URL',
              type: 'text',
             
            },
          ],
        },
        {
          name: 'captions',
          label: 'Captions',
          type: 'array',
          fields: [
            {
              name: 'language',
              label: 'Language',
              type: 'text',
             
            },
            {
              name: 'url',
              label: 'Caption File URL',
              type: 'text',
             
            },
          ],
        },
      ],
    },
  ],
};

export default VideoBlock;
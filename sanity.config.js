import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

const postType = {
  name: 'post',
  title: 'Blogartikel',
  type: 'document',
  fields: [
    {name: 'title', title: 'Titel', type: 'string', validation: R => R.required()},
    {name: 'slug', title: 'URL-Slug', type: 'slug', options: {source: 'title'}, validation: R => R.required()},
    {name: 'category', title: 'Kategorie', type: 'string', options: {list: ['Angebote', 'Gesundheit', 'Rezepte']}},
    {name: 'excerpt', title: 'Kurzbeschreibung', type: 'text'},
    {name: 'mainImage', title: 'Titelbild', type: 'image', options: {hotspot: true}},
    {name: 'publishedAt', title: 'Veröffentlicht am', type: 'datetime'},
    {name: 'body', title: 'Inhalt', type: 'array', of: [{type: 'block'}]},
  ],
}

export default defineConfig({
  name: 'default',
  title: 'Larentina Blog',
  projectId: 'tpy3ua1h',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [postType],
  },
})
// Logos de tecnologías para los carruseles del Home.
// Los SVG viven en src/assets/images/technologies/{frontend,backend}.

import angular from '../assets/images/technologies/frontend/angular.svg'
import bootstrap from '../assets/images/technologies/frontend/bootstrap.svg'
import css from '../assets/images/technologies/frontend/css.svg'
import html from '../assets/images/technologies/frontend/html.svg'
import javascript from '../assets/images/technologies/frontend/javascript.svg'
import nextjs from '../assets/images/technologies/frontend/nextjs.svg'
import reactjs from '../assets/images/technologies/frontend/reactjs.svg'
import tailwind from '../assets/images/technologies/frontend/tailwind.svg'

import django from '../assets/images/technologies/backend/django.svg'
import expressjs from '../assets/images/technologies/backend/expressjs.svg'
import fastapi from '../assets/images/technologies/backend/fastapi.svg'
import github from '../assets/images/technologies/backend/github.svg'
import nodejs from '../assets/images/technologies/backend/nodejs.svg'
import postgresql from '../assets/images/technologies/backend/postgresql.svg'
import postman from '../assets/images/technologies/backend/postman.svg'
import python from '../assets/images/technologies/backend/python.svg'

export const FRONTEND_TECH = [
  { name: 'React', logo: reactjs },
  { name: 'Next.js', logo: nextjs },
  { name: 'Angular', logo: angular },
  { name: 'JavaScript', logo: javascript },
  { name: 'HTML5', logo: html },
  { name: 'CSS3', logo: css },
  { name: 'Tailwind CSS', logo: tailwind },
  { name: 'Bootstrap', logo: bootstrap },
]

export const BACKEND_TECH = [
  { name: 'Node.js', logo: nodejs },
  { name: 'Express', logo: expressjs },
  { name: 'Python', logo: python },
  { name: 'Django', logo: django },
  { name: 'FastAPI', logo: fastapi },
  { name: 'PostgreSQL', logo: postgresql },
  { name: 'Postman', logo: postman },
  { name: 'GitHub', logo: github },
]

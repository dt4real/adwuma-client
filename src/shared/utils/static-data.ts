import browseImage from 'src/assets/browse.png';
import collaborate from 'src/assets/collaborate.png';
import contact from 'src/assets/contact.png';
import create from 'src/assets/create.png';
import { ICategory } from 'src/features/home/interfaces/home.interface';

export const categories: ICategory[] = [
  {
    name: 'Programming & Tech',
    icon: create
  },
  {
    name: 'Graphic & Design',
    icon: browseImage
  },
  {
    name: 'Digital Marketing',
    icon: collaborate
  },
  {
    name: 'Writing & Translation',
    icon: contact
  },
  {
    name: 'Video & Animation',
    icon: collaborate
  },
  {
    name: 'Music & Audio',
    icon: collaborate
  },
  {
    name: 'Data',
    icon: collaborate
  },
  {
    name: 'Business',
    icon: collaborate
  }
];

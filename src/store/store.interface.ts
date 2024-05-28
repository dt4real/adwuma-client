import { INotification } from 'src/shared/header/interfaces/header.interface';

export interface IReduxState {
  authUser: object;
  header: string;
  logout: boolean;
  buyer: object;
  seller: object;
  showCategoryContainer: boolean;
  notification: INotification;
}

import { Types } from 'mongoose';

export class EventDo {
  _id: Types.ObjectId;
  slug: string;
  name: string;
  description: string;
  poster: string;
  start_date: string;
  end_date: string;
  published: boolean;

  constructor(props: Partial<EventDo>) {
    this._id = props._id;
    this.slug = props.slug || "";
    this.name = props.name || "";
    this.description = props.description || "";
    this.poster = props.poster || "";
    this.end_date = props.end_date || "";
    this.start_date = props.start_date || "";
    this.published = props.published || false;
  }

}

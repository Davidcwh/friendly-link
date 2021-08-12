import { Subject } from 'rxjs';

const subject = new Subject();

export const rxjsService = {
    sendLoad: load => subject.next(load),
    // clearMessages: () => subject.next(),
    onLoad: () => subject.asObservable()
};
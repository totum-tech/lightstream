import flyd from 'flyd';

const last = list => (list.length ? list[list.length - 1] : []);

export const batchWhen = (throttle$, source$) => {
  let batch = [];
  return flyd.combine((wait$, value$, self$, changed) => {
    if ( changed.indexOf(value$) > -1 ) batch.push(source$());
    if ( changed.indexOf(wait$) > -1 && batch.length ) {
      self$(batch);
      batch = [];
    }
  }, [throttle$, source$]);
};

export const throttleWhen = (throttle$, source$) =>
  flyd.map(last, batchWhen(throttle$, source$));

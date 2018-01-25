import { createModule } from 'redux-modules';
import trackModule from '../Track/module';
import { loop, Effects } from 'redux-loop';

const module = createModule({
  name: 'timeline',
  initialState: {
    tracks: {
      0: trackModule.reducer(undefined, { type: 'init' }),
      1: trackModule.reducer(undefined, { type: 'init' }),
      2: trackModule.reducer(undefined, { type: 'init' }),
      3: trackModule.reducer(undefined, { type: 'init' }),
      4: trackModule.reducer(undefined, { type: 'init' }),
    },
    playing: false,
    repeat: false,
  },
  selector: state => state.timeline,
  transformations: {
    updateTrack: (state, action) => {
      const { payload, meta } = action;
      console.log(payload, meta)
      const [
        nstate,
        neffects,
      ] = trackModule.reducer(state.tracks[meta.id], payload);

      return loop(
        { ...state, tracks: { ...state.tracks, [meta.id]: nstate } },
        Effects.lift(
          neffects,
          a => module.actions.updateTrack(a, {id: meta.id})
        ),
      );
    },
    play: (state) => ({ ...state, playing: true }),
    stop: (state) => ({ ...state, playing: false }),
    setRepeat: (state, { payload }) => ({ ...state, repeat: payload }),
  },
});

export default module;

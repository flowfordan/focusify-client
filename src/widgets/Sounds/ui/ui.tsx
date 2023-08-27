import { Sound, soundsModel } from 'entities/Sound';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

export const Sounds = () => {
  const items = soundsModel.sounds;
  console.log('ITEMS:', toJS(items));
  return (
    <div>
      {items.map((i) => (
        <Sound key={i.name} soundData={i} />
      ))}
    </div>
  );
};

import 'shelljs/global';

export function classifyImage(url) {
  cd('torch');
  if(exec(`th classify.lua "${url}"`) !== 0) {
    echo('executing script success');
  }
}

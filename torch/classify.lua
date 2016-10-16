-- Imagenet classification with Torch7 demo
--
-- Will be using Network-in-Network trained in Torch-7 with batch normalization
-- more information on it here
-- 
require 'image'
require 'nn'

-- Rescales and normalizes the image
function preprocess(im, img_mean)
  -- rescale the image
  local im3 = image.scale(im,224,224,'bilinear')
  -- subtract imagenet mean and divide by std
  for i=1,3 do im3[i]:add(-img_mean.mean[i]):div(img_mean.std[i]) end
  return im3
end

file = io.open("result.txt", "w")
io.output(file)

--print '==> Downloading image and network'
local image_url = arg[1]--'http://upload.wikimedia.org/wikipedia/commons/e/e9/Goldfish3.jpg'
local network_url = 'https://www.dropbox.com/s/npmr5egvjbg7ovb/nin_nobn_final.t7'
local image_name = string.sub (paths.basename(image_url), 1, 4)
local network_name = paths.basename(network_url)
if not paths.filep(image_name) then os.execute('wget ' .. image_url .. ' -O new' .. image_name .. '.jpg')   end
if not paths.filep(network_name) then os.execute('wget '..network_url)   end

--print '==> Loading network'
local net = torch.load(network_name):unpack():float()
net:evaluate()
--print(net)

--print '==> Loading synsets'
--print 'Loads mapping from net outputs to human readable labels'
local synset_words = {}
for line in io.lines'synset_words.txt' do table.insert(synset_words, line:sub(11)) end

--print '==> Loading image and imagenet mean'
local im = image.load('new'.. image_name .. '.jpg')

--print '==> Preprocessing'
-- Our network has mean and std saved in net.transform
--print('ImageNet ', net.transform)
local I = preprocess(im, net.transform):view(1,3,224,224):float()

--print 'Propagate through the network, sort outputs in decreasing order and show 5 best classes'
local _,classes = net:forward(I):view(-1):sort(true)
for i=1,5 do
  --local result = tostring(synset_words[classes[1]])
  io.write(tostring(synset_words[classes[i]]))
  io.write('\n')
  --print('predicted class '..tostring(1)..': ', synset_words[classes[1]])
end


io.close(file)

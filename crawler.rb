require 'wombat'
require 'erubis'

results = Wombat.crawl do
  base_url "http://megapolis-real.by"
  path "/biznes-czentryi/"

  center 'css=.c_item', :follow do
    info 'css=.content wide_content' do
      title 'css=.zagol.objzagol h1' do |title|
        title[/[^-]+/]
      end
      #TODO add atomic address

      region 'css=.' do
      end

      address 'css=.zagol.objzagol h1' do |address|
        address[/[^-]+/]
      end

      description 'css=.block_info'
      photo 'css=.mainfoto', :html do |photo|
        photo[/src="\S+"/]
      end

      info 'css=.block_info ul li', :list
    end
  end
end

renderer = Erubis::Eruby.new(File.read("business.scs.erb"))

results.each do |center|
  renderer.result(center: center)
end
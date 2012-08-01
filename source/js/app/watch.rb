# Script to watch a directory for any changes to a haml file
# and compile it.
#
# USAGE: ruby haml_watch.rb <directory_to_watch>
#  
require 'rubygems'
require 'fssm'

directory = ARGV.first
FSSM.monitor(directory,'*.js') do
  update do |base|
    command = "make -f MakefileFull"
    %x{#{command}}
    puts "Updated."
  end
end


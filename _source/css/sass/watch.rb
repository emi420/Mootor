# Script to watch a directory for any changes to a haml file
# and compile it.
#
# USAGE: ruby haml_watch.rb <directory_to_watch>
#  
require 'rubygems'
require 'fssm'

directory = ARGV.first
FSSM.monitor(directory, '*.scss') do
  update do |base, relative|
    command = "cd ../../../css/src/; compass compile -f; cd ../../_source/css/sass"
    %x{#{command}}
    puts "Updated"
  end
end
# Script to watch current directory for any changes to file
# and excecute actions on it.
#
# USAGE: ruby watch.rb
#  
require 'rubygems'
require 'fssm'

# Monitor
FSSM.monitor(directory,'*.js') do
  update do |base|
    command = "make -f MakefileFull"
    %x{#{command}}
    puts "Updated."
  end
end



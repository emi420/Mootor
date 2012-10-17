
# Set this to the root of your project when deployed:
http_path = "."
css_dir = "../"
sass_dir = ""
images_dir = "../../img"
#http_images_dir = "../img"
javascripts_dir = "../../js"


#add dd a path to the list of sass import paths for your compass project
add_import_path "../../../source/css/sass"

# You can select your preferred output style here (can be overridden via the command line):
#output_style = :expanded # :expanded or :nested or :compact or :compressed

# changes the output style depending on the enviroment selected when compiling from command line.
# if the enviroment set is production, the output style is compressed, else defaults to expanded.
# the enviroment can be set via the command line:  compass compile -e production --force
output_style = (environment == :production) ? :compressed : :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = true

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

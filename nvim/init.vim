call plug#begin('~/.vim/plugged')

"Airline package
Plug 'vim-airline/vim-airline'

"Airline themes
Plug 'vim-airline/vim-airline-themes'

"Main theme
Plug 'morhetz/gruvbox'

"You complete me
Plug 'Valloric/YouCompleteMe'

"Nerd tree
Plug 'scrooloose/nerdtree'

"Arduino
Plug 'stevearc/vim-arduino'

call plug#end()

"Don't ask to load ycm python file
let g:ycm_confirm_extra_conf = 0

"Tab settings
set tabstop=4
set softtabstop=4
set shiftwidth=4
set noexpandtab

"Show relative line numbers
set relativenumber
set number

"Show visual line at cusor line
set cursorline

au BufNewFile,BufRead *.ino set ft=cpp

set background=dark
set termguicolors

"Makes scrolling fast
set lazyredraw

colorscheme hybrid

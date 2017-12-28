call plug#begin('~/.vim/plugged')

"Airline package
Plug 'vim-airline/vim-airline'

"Airline themes
Plug 'vim-airline/vim-airline-themes'

"Main theme
Plug 'morhetz/gruvbox'

"Nerd commenter
Plug 'scrooloose/nerdcommenter'

"CSS Completion
Plug 'othree/csscomplete.vim'

"Ctrlp
Plug 'ctrlpvim/ctrlp.vim'

"JsHint
Plug 'wookiehangover/jshint.vim'

"Install Tern
Plug 'ternjs/tern_for_vim', { 'for': 'javascript' }

"You complete me
Plug 'Valloric/YouCompleteMe'

"AutoPairs
Plug 'jiangmiao/auto-pairs'

"Nerd tree
Plug 'scrooloose/nerdtree'

"Arduino
Plug 'stevearc/vim-arduino'

"Emmet
Plug 'mattn/emmet-vim'

"CSS 3 Completion
Plug 'hail2u/vim-css3-syntax'

"Vimball
Plug 'vim-scripts/Vimball'

call plug#end()

" enhance YCM JS completion with tern's smarts
autocmd FileType javascript setlocal omnifunc=tern#Complete

"YCM Global File
let g:ycm_global_ycm_extra_conf = '~/.vim/.ycm_extra_conf.py'

"Don't ask to load ycm python file
let g:ycm_confirm_extra_conf = 0

"Configure emmet
let g:user_emmet_install_global = 0
autocmd FileType html,css EmmetInstall

function! s:expand_html_tab()
  " try to determine if we're within quotes or tags.
  " if so, assume we're in an emmet fill area.
  let line = getline('.')
  if col('.') < len(line)
    let line = matchstr(line, '[">][^<"]*\%'.col('.').'c[^>"]*[<"]')

    if len(line) >= 2
      return "\<Plug>(emmet-move-next)"
    endif
  endif

  " go to next item in a popup menu.
  " if pumvisible()
  "  return \"\<C-n>"
  "endif

  " expand anything emmet thinks is expandable.
  " I'm not sure control ever reaches below this block.
  if emmet#isExpandable()
    return "\<Plug>(emmet-expand-abbr)"
  endif

  " return a regular tab character
  return "\<tab>"
endfunction

autocmd FileType html imap <buffer><expr><tab> <sid>expand_html_tab()

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

"Enable CSS completion
autocmd FileType css setlocal omnifunc=csscomplete#CompleteCSS noci

"Enable autopopup CSS completion
let g:ycm_semantic_triggers = {
    \   'css': [ 're!^\t+', 're!:\s+', 're!@' ],
    \ }

"Makes scrolling fast
set lazyredraw

"Set you complete me keybindings
map <F12> :YcmCompleter GoTo <CR>
map <M-Return> :YcmCompleter FixIt <CR> :on <CR> 

"Set NERDTree bindings
map <M-l> :NERDTreeToggle <CR>

map <C-n> :!ctags -R . <CR> :CtrlPTag <CR>

"UVA Judge helpers

map <C-s> :w <CR>
map <F4> :w <CR> :!g++ % <CR>
map <F5> <F4> :terminal ./a.out <CR> <CR> i

map <F9> <F4> :!./a.out < input > programOutput ; cat programOutput <CR>
map <F10> <F9> :terminal diff -s output programOutput <CR> <CR>

command View :!uva view %:r
command Send :!uva send % 
command Status :terminal uva status
command Copy :%w !xclip -i -sel c

colorscheme hybrid

import atexit
import os
import gdb

file_path_value = gdb.parse_and_eval("$breakpoints_save_file_path")
should_save_breakpoints = file_path_value.type.name != "void"

if should_save_breakpoints:
    file_path = file_path_value.string()

    #If there are already breakpoints saved, load them
    if os.path.isfile(file_path):
        gdb.execute("source " + file_path)
    else:
        gdb.execute("break main")


@atexit.register
def on_exit():
    if should_save_breakpoints:
        #If there is any breakpoint, save them, if not, delete breakpoint save file
        if len(gdb.breakpoints()) == 0:
            #Delete breakpoint save file if it exists
            if os.path.isfile(file_path):
                os.remove(file_path)
        else:
            gdb.execute("save breakpoints " + file_path)


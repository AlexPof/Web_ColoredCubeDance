
var CURRENT_GEN_MAPPING = {"U":"U","L":"L","P":"P"};
var VALID_AUTOMORPHISMS = [];
var SELECTED_AUTOMORPHISM_IDX = null;
var augmented_perm_index = 0;
var quadrant1_chord = "C_M";
var quadrant2_chord = "G_M";
var quadrant3_chord = "D_M";
var quadrant4_chord = "F_M";
var quadrant1_choice="";
var quadrant2_choice="";
var quadrant3_choice="";
var quadrant4_choice="";
var AUGMENTED_PERMUTATIONS = {"0":{"perm":{"C_aug":"C_aug","G_aug":"G_aug","D_aug":"D_aug","F_aug":"F_aug"},"paths":[]},
                              "1":{"perm":{"C_aug":"G_aug","G_aug":"D_aug","D_aug":"F_aug","F_aug":"C_aug"},
                                   "paths":["M 105 50 Q 100 95 155 90",
                                            "M 155 100 Q 100 95 105 143",
                                            "M 95 143 Q 100 95 45 100",
                                            "M 45 90 Q 100 95 95 50"]},
                              "2":{"perm":{"C_aug":"D_aug","G_aug":"F_aug","D_aug":"C_aug","F_aug":"G_aug"},
                                    "paths":["M 105 50 Q 100 95 105 143",
                                             "M 155 90 Q 100 95 45 90",
                                             "M 95 143 Q 100 95 95 50",
                                             "M 45 100 Q 100 95 155 100"]},
                            "3":{"perm":{"C_aug":"F_aug","G_aug":"C_aug","D_aug":"G_aug","F_aug":"D_aug"},
                                 "paths":["M 95 50 Q 100 95 45 90",
                                           "M 155 90 Q 100 95 105 50",
                                           "M 105 143 Q 100 95 155 100",
                                           "M 45 100 Q 100 95 95 143"]},
                              "4":{"perm":{"C_aug":"C_aug","G_aug":"F_aug","D_aug":"D_aug","F_aug":"G_aug"},
                                   "paths":["M 155 90 Q 100 95 45 90",
                                           "M 45 100 Q 100 95 155 100"]},
                              "5":{"perm":{"C_aug":"G_aug","G_aug":"C_aug","D_aug":"F_aug","F_aug":"D_aug"},
                                  "paths":["M 105 50 Q 100 95 155 90",
                                           "M 155 100 Q 100 95 95 50",
                                           "M 95 143 Q 100 95 45 100",
                                           "M 45 90 Q 100 95 105 143",]},
                              "6":{"perm":{"C_aug":"D_aug","G_aug":"G_aug","D_aug":"C_aug","F_aug":"F_aug"},
                                  "paths":["M 105 50 Q 100 95 105 143",
                                           "M 95 143 Q 100 95 95 50"]},
                              "7":{"perm":{"C_aug":"F_aug","G_aug":"D_aug","D_aug":"G_aug","F_aug":"C_aug"},
                                   "paths":["M 95 50 Q 100 95 45 90",
                                            "M 155 100 Q 100 95 105 143",
                                            "M 95 143 Q 100 95 155 90",
                                            "M 45 100 Q 100 95 105 50"]}}


PERM_AUGMENTED_SVG = d3.select("#perm_augmented");
draw_augmented_permutation();
get_valid_automorphisms([true,true,true,true]); // First initialization

function get_final_automorphism() {
  SELECTED_AUTOMORPHISM_IDX = null;

  for (var i=0;i<VALID_AUTOMORPHISMS.length;i++) {
    aut_key = VALID_AUTOMORPHISMS[i];
    var aut_chord_mapping = ALL_AUTS[aut_key]["chord_mapping"];
    if (aut_chord_mapping[quadrant1_chord]==quadrant1_choice &&
        aut_chord_mapping[quadrant2_chord]==quadrant2_choice &&
        aut_chord_mapping[quadrant3_chord]==quadrant3_choice &&
        aut_chord_mapping[quadrant4_chord]==quadrant4_choice) {
          SELECTED_AUTOMORPHISM_IDX = aut_key;
        }
  }
  display_selected_automorphism();
}

function get_valid_automorphisms(quadrant_changes) {
  VALID_AUTOMORPHISMS = [];
  var quadrant1_images = [];
  var quadrant2_images = [];
  var quadrant3_images = [];
  var quadrant4_images = [];

	var auts_keys = Object.keys(ALL_AUTS);

	for (var i=0;i<auts_keys.length;i++) {
		var aut_gen_mapping = ALL_AUTS[auts_keys[i]]["gen_mapping"];

		if (aut_gen_mapping["U"]==CURRENT_GEN_MAPPING["U"] &&
        aut_gen_mapping["P"]==CURRENT_GEN_MAPPING["P"] &&
			  aut_gen_mapping["L"]==CURRENT_GEN_MAPPING["L"]) {
          var aut_chord_mapping = ALL_AUTS[auts_keys[i]]["chord_mapping"];
          var selected_perm_augmented = AUGMENTED_PERMUTATIONS[augmented_perm_index]["perm"];

          if (aut_chord_mapping["C_aug"]==selected_perm_augmented["C_aug"] &&
              aut_chord_mapping["G_aug"]==selected_perm_augmented["G_aug"] &&
              aut_chord_mapping["D_aug"]==selected_perm_augmented["D_aug"] &&
              aut_chord_mapping["F_aug"]==selected_perm_augmented["F_aug"]) {

              quadrant1_images.push(aut_chord_mapping[quadrant1_chord]);
              quadrant2_images.push(aut_chord_mapping[quadrant2_chord]);
              quadrant3_images.push(aut_chord_mapping[quadrant3_chord]);
              quadrant4_images.push(aut_chord_mapping[quadrant4_chord]);
              VALID_AUTOMORPHISMS.push(auts_keys[i]);
           }
			}
	}
    
  if (quadrant_changes[0]==true) {
    quadrant1_choice="";
    quadrant1_images = unique(quadrant1_images);
    for (var i=0;i<3;i++) {
        document.getElementById("quadrant1_choice"+i.toString()).setAttribute("class","button");
        document.getElementById("quadrant1_choice"+i.toString()).innerHTML = format_chord_string(quadrant1_images[i]);
    }
  }

  if (quadrant_changes[1]==true) {
    quadrant2_choice="";
    quadrant2_images = unique(quadrant2_images);
    for (var i=0;i<3;i++) {
        document.getElementById("quadrant2_choice"+i.toString()).setAttribute("class","button");
        document.getElementById("quadrant2_choice"+i.toString()).innerHTML = format_chord_string(quadrant2_images[i]);
    }
  }
  
  if (quadrant_changes[2]==true) {
    quadrant3_choice="";
    quadrant3_images = unique(quadrant3_images);
    for (var i=0;i<3;i++) {
        document.getElementById("quadrant3_choice"+i.toString()).setAttribute("class","button");
        document.getElementById("quadrant3_choice"+i.toString()).innerHTML = format_chord_string(quadrant3_images[i]);
    }
  }
  if (quadrant_changes[3]==true) {
    quadrant4_choice="";
    quadrant4_images = unique(quadrant4_images);
    for (var i=0;i<3;i++) {
        document.getElementById("quadrant4_choice"+i.toString()).setAttribute("class","button");
        document.getElementById("quadrant4_choice"+i.toString()).innerHTML = format_chord_string(quadrant4_images[i]);
    }
  }
  
  get_final_automorphism();
}

function display_selected_automorphism() {
  if (!(SELECTED_AUTOMORPHISM_IDX==null)) {

	var htmlContent="The selected automorphism has index "+SELECTED_AUTOMORPHISM_IDX+"<br>";
	htmlContent += "<button class='button'style='width:80px' onclick='add_aut("+SELECTED_AUTOMORPHISM_IDX.toString()+");'>Add to list</button>";
    document.getElementById("selected_automorphism_info").innerHTML = htmlContent;
  } else {
    document.getElementById("selected_automorphism_info").innerHTML = "";
  }
}

function change_augmented_perm(step) {
  augmented_perm_index = mod(augmented_perm_index+step,8);
  draw_augmented_permutation();
  get_valid_automorphisms([true,true,true,true]);
}

function draw_augmented_permutation() {
  PERM_AUGMENTED_SVG.selectAll(".perm_path").remove();

  var the_paths = AUGMENTED_PERMUTATIONS[augmented_perm_index]["paths"];
  for (var i=0;i<the_paths.length;i++) {
    PERM_AUGMENTED_SVG.append("path").attr("marker-end","url(#head)")
                                     .attr("d",the_paths[i])
                                     .attr("stroke","#008CBA")
                                     .attr("fill","none")
                                     .attr("stroke-width","2px")
                                     .attr("class","perm_path");
  }

}

////////////////////////////////////////////////
///// A series of functions for handling the mapping of chords

function changeMenuChord(tochange){
    var selection = this.innerHTML;
    document.getElementById(tochange).innerHTML=selection;
    
    quadrant1_chord = deformat_chord_string(d3.select("#quadrant1").html());
    quadrant2_chord = deformat_chord_string(d3.select("#quadrant2").html());
    quadrant3_chord = deformat_chord_string(d3.select("#quadrant3").html());
    quadrant4_chord = deformat_chord_string(d3.select("#quadrant4").html());

    var quadrant_changes = [false,false,false,false];
    quadrant_changes[parseInt(tochange[tochange.length-1])-1] = true;
    get_valid_automorphisms(quadrant_changes);
}

function quadrant1_click(num) {
  for (var i=0;i<3;i++) {
    document.getElementById("quadrant1_choice"+i.toString()).setAttribute("class","button");
  }
  document.getElementById("quadrant1_choice"+num.toString()).setAttribute("class","button_active");
  quadrant1_choice = document.getElementById("quadrant1_choice"+num.toString()).innerHTML;
  quadrant1_choice = deformat_chord_string(quadrant1_choice);
  get_final_automorphism();
}
function quadrant2_click(num) {
  for (var i=0;i<3;i++) {
    document.getElementById("quadrant2_choice"+i.toString()).setAttribute("class","button");
  }
  document.getElementById("quadrant2_choice"+num.toString()).setAttribute("class","button_active");
  quadrant2_choice = document.getElementById("quadrant2_choice"+num.toString()).innerHTML;
  quadrant2_choice = deformat_chord_string(quadrant2_choice);
  get_final_automorphism();
}
function quadrant3_click(num) {
  for (var i=0;i<3;i++) {
    document.getElementById("quadrant3_choice"+i.toString()).setAttribute("class","button");
  }
  document.getElementById("quadrant3_choice"+num.toString()).setAttribute("class","button_active");
  quadrant3_choice = document.getElementById("quadrant3_choice"+num.toString()).innerHTML;
  quadrant3_choice = deformat_chord_string(quadrant3_choice);
  get_final_automorphism();
}
function quadrant4_click(num) {
  for (var i=0;i<3;i++) {
    document.getElementById("quadrant4_choice"+i.toString()).setAttribute("class","button");
  }
  document.getElementById("quadrant4_choice"+num.toString()).setAttribute("class","button_active");
  quadrant4_choice = document.getElementById("quadrant4_choice"+num.toString()).innerHTML;
  quadrant4_choice = deformat_chord_string(quadrant4_choice);
  get_final_automorphism();
}

////////////////////////////////////////////////
///// A series of functions for handling the mapping of transformations

function U_click() {
	document.getElementById("U").className = "button_active";
	document.getElementById("LUL").className = "button";
	CURRENT_GEN_MAPPING["U"] = "U";
	get_valid_automorphisms([true,true,true,true]);
}
function LUL_click() {
	document.getElementById("U").className = "button";
	document.getElementById("LUL").className = "button_active";
	CURRENT_GEN_MAPPING["U"] = "LUL";
	get_valid_automorphisms([true,true,true,true]);
}
function L_L_click() {
	document.getElementById("L_L").className = "button_active";
	document.getElementById("L_P").className = "button";
	document.getElementById("L_PLP").className = "button";
	CURRENT_GEN_MAPPING["L"] = "L";

	document.getElementById("P_1").className = "button_active";
	document.getElementById("P_2").className = "button";
	document.getElementById("P_1").innerHTML = "P";
	document.getElementById("P_2").innerHTML = "PLP";
	CURRENT_GEN_MAPPING["P"] = "P";
	get_valid_automorphisms([true,true,true,true]);
}
function L_P_click() {
	document.getElementById("L_L").className = "button";
	document.getElementById("L_P").className = "button_active";
	document.getElementById("L_PLP").className = "button";
	CURRENT_GEN_MAPPING["L"] = "P";

	document.getElementById("P_1").className = "button_active";
	document.getElementById("P_2").className = "button";
	document.getElementById("P_1").innerHTML = "L";
	document.getElementById("P_2").innerHTML = "PLP";
	CURRENT_GEN_MAPPING["P"] = "L";
	get_valid_automorphisms([true,true,true,true]);
}
function L_PLP_click() {
	document.getElementById("L_L").className = "button";
	document.getElementById("L_P").className = "button";
	document.getElementById("L_PLP").className = "button_active";
	CURRENT_GEN_MAPPING["L"] = "PLP";

	document.getElementById("P_1").className = "button_active";
	document.getElementById("P_2").className = "button";
	document.getElementById("P_1").innerHTML = "P";
	document.getElementById("P_2").innerHTML = "L";
	CURRENT_GEN_MAPPING["P"] = "P";
	get_valid_automorphisms([true,true,true,true]);
}
function P_1_click() {
	document.getElementById("P_1").className = "button_active";
	document.getElementById("P_2").className = "button";
	CURRENT_GEN_MAPPING["P"] = document.getElementById("P_1").innerHTML;
	get_valid_automorphisms([true,true,true,true]);
}
function P_2_click() {
	document.getElementById("P_1").className = "button";
	document.getElementById("P_2").className = "button_active";
	CURRENT_GEN_MAPPING["P"] = document.getElementById("P_2").innerHTML;
	get_valid_automorphisms([true,true,true,true]);
}

//////////////////////////////
///// HELPER FUNCTIONS

//// Returns an array with unique values
function unique(arr) {
  var u = {}, a = [];
  for(var i = 0, l = arr.length; i < l; ++i){
      if(!u.hasOwnProperty(arr[i])) {
          a.push(arr[i]);
          u[arr[i]] = 1;
      }
  }
  return a;
}

//// General purpose mod function
function mod(n, m) {
    return ((n % m) + m) % m;
}

//// Format chord strings for display in the browser
function format_chord_string(chrd_str) {
  var new_chrd_str = chrd_str;

  new_chrd_str = new_chrd_str.replace("s","&#9839;")
  new_chrd_str = new_chrd_str.replace("b","&#9837;")
  new_chrd_str = new_chrd_str.replace("_M","<sub>M</sub>")
  new_chrd_str = new_chrd_str.replace("_m","<sub>m</sub>")
  new_chrd_str = new_chrd_str.replace("_aug","<sub>aug</sub>")

  return new_chrd_str;
}

function deformat_chord_string(chrd_str) {
	var new_chrd_str = chrd_str;

	new_chrd_str = new_chrd_str.replace("\u266F","s");
	new_chrd_str = new_chrd_str.replace("\u266D","b");
	new_chrd_str = new_chrd_str.replace("<sub>M</sub>","_M");
	new_chrd_str = new_chrd_str.replace("<sub>m</sub>","_m");

	return new_chrd_str;
}

function impose_automorphism(aut_index) {
	var gen_map = ALL_AUTS[aut_index]["gen_mapping"];
	var chord_map = ALL_AUTS[aut_index]["chord_mapping"];
	if (gen_map["U"]=="U") { U_click(); } else {LUL_click();}
	if (gen_map["L"]=="P") { L_P_click(); } else if (gen_map["L"]=="L") {L_L_click();} else {L_PLP_click();}
	if (gen_map["P"]==document.getElementById("P_1").innerHTML) { P_1_click(); } else {P_2_click();}
	augmented_perm_index = 0;
	while(true) {
		var selected_perm_augmented = AUGMENTED_PERMUTATIONS[augmented_perm_index]["perm"]
		if (chord_map["C_aug"]==selected_perm_augmented["C_aug"] &&
              chord_map["G_aug"]==selected_perm_augmented["G_aug"] &&
              chord_map["D_aug"]==selected_perm_augmented["D_aug"] &&
              chord_map["F_aug"]==selected_perm_augmented["F_aug"]) {
				  break
		}
		augmented_perm_index+=1;
	}
	draw_augmented_permutation();
    
    quadrant1_chord = "C_M";
    quadrant2_chord = "G_M";
    quadrant3_chord = "D_M";
    quadrant4_chord = "F_M";
    d3.select("#quadrant1").html(format_chord_string(quadrant1_chord));
    d3.select("#quadrant2").html(format_chord_string(quadrant2_chord));
    d3.select("#quadrant3").html(format_chord_string(quadrant3_chord));
    d3.select("#quadrant4").html(format_chord_string(quadrant4_chord));
	get_valid_automorphisms([true,true,true,true]);

	for (var i=0;i<3;i++) {
		quadrant1_choice = document.getElementById("quadrant1_choice"+i.toString()).innerHTML;
		quadrant1_choice = deformat_chord_string(quadrant1_choice);
		if (chord_map["C_M"]==quadrant1_choice) {
			quadrant1_click(i);
			break
		}
	}
	for (var i=0;i<3;i++) {
		quadrant2_choice = document.getElementById("quadrant2_choice"+i.toString()).innerHTML;
		quadrant2_choice = deformat_chord_string(quadrant2_choice);
		if (chord_map["G_M"]==quadrant2_choice) {
			quadrant2_click(i);
			break
		}
	}
	for (var i=0;i<3;i++) {
		quadrant3_choice = document.getElementById("quadrant3_choice"+i.toString()).innerHTML;
		quadrant3_choice = deformat_chord_string(quadrant3_choice);
		if (chord_map["D_M"]==quadrant3_choice) {
			quadrant3_click(i);
			break
		}
	}
	for (var i=0;i<3;i++) {
		quadrant4_choice = document.getElementById("quadrant4_choice"+i.toString()).innerHTML;
		quadrant4_choice = deformat_chord_string(quadrant4_choice);
		if (chord_map["F_M"]==quadrant4_choice) {
			quadrant4_click(i);
			break
		}
	}
}

#include <stdio.h>
#include <math.h>
#include <emscripten/emscripten.h>

int main(int argc, char ** argv) {
}

#ifdef __cplusplus
extern "C" {
#endif

/*
 * Each "point" is a set of [x, y, size, num_triangles]
*/
EMSCRIPTEN_KEEPALIVE
void generate_circles(float *points, int count, float pixelX, float pixelY, float *triangles) {
  int index = 0;
  int target = 0;

  for (int i = 0; i < count; i++) {
    float x = points[index++];
    float y = points[index++];
    float size = points[index++];
    float segments = points[index++];

    float last_x = x;
    float last_y = y + size * pixelY;

    for (int j = 0; j < segments; j++) {
      triangles[target++] = x;
      triangles[target++] = y;
      triangles[target++] = last_x;
      triangles[target++] = last_y;

      float angle = 2 * (j+1) * M_PI / segments;
      last_x = x + sin(angle) * size * pixelX;
      last_y = y + cos(angle) * size * pixelY;

      triangles[target++] = last_x;
      triangles[target++] = last_y;
    }
  }
}

/*
 * Each "point" is a set of [x, y, size]
 * 
*/
EMSCRIPTEN_KEEPALIVE
void generate_shapes(float *points, int count, float *shape, int shapeCount, float pixelX, float pixelY, float *triangles) {
  int index = 0;
  int target = 0;

  for (int i = 0; i < count; i++) {
    float x = points[index++];
    float y = points[index++];
    float size = points[index++];

    float sizeX = size * pixelX;
    float sizeY = size * pixelY;

    for (int j = 0; j < shapeCount - 1; j++) {
      int shapePos = j * 2;
      triangles[target++] = x;
      triangles[target++] = y;
      triangles[target++] = x + shape[shapePos++] * sizeX;
      triangles[target++] = y + shape[shapePos++] * sizeY;

      triangles[target++] = x + shape[shapePos++] * sizeX;
      triangles[target++] = y + shape[shapePos++] * sizeY;
    }
  }
}

#ifdef __cplusplus
}
#endif

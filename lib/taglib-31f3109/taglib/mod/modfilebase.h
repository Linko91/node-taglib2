/***************************************************************************
    copyright           : (C) 2011 by Mathias Panzenböck
    email               : grosser.meister.morti@gmx.net
 ***************************************************************************/

/***************************************************************************
 *   This library is free software; you can redistribute it and/or modify  *
 *   it  under the terms of the GNU Lesser General Public License version  *
 *   2.1 as published by the Free Software Foundation.                     *
 *                                                                         *
 *   This library is distributed in the hope that it will be useful, but   *
 *   WITHOUT ANY WARRANTY; without even the implied warranty of            *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU     *
 *   Lesser General Public License for more details.                       *
 *                                                                         *
 *   You should have received a copy of the GNU Lesser General Public      *
 *   License along with this library; if not, write to the Free Software   *
 *   Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,            *
 *   MA  02110-1301  USA                                                   *
 ***************************************************************************/

#ifndef TAGLIB_MODFILEBASE_H
#define TAGLIB_MODFILEBASE_H

#include "taglib.h"
#include "tfile.h"
#include "tstring.h"
#include "tlist.h"
#include "taglib_export.h"

#include <algorithm>

namespace TagLib {

  namespace Mod {

    class TAGLIB_EXPORT FileBase : public TagLib::File
    {
    protected:
      FileBase(FileName file);
      FileBase(IOStream *stream);

      void writeString(const String &s, unsigned int size, char padding = 0);
      void writeByte(unsigned char byte);
      void writeU16L(unsigned short number);
      void writeU32L(unsigned int number);
      void writeU16B(unsigned short number);
      void writeU32B(unsigned int number);

      bool readString(String &s, unsigned int size);
      bool readByte(unsigned char &byte);
      bool readU16L(unsigned short &number);
      bool readU32L(unsigned int &number);
      bool readU16B(unsigned short &number);
      bool readU32B(unsigned int &number);
    };

  }

}

#endif
